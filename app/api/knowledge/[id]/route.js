import { NextResponse } from 'next/server'
import { query } from "@/app/lib/neon"

export const runtime = 'nodejs'

export async function GET(request, { params }) {
    try {
        // In Next.js 13+ App Router, params is a Promise
        const { id } = await params

        console.log('Fetching knowledge article with ID:', id)

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'ID is required'
            }, { status: 400 })
        }

        // Fetch the article from database with topic join
        const sqlQuery = `
            SELECT 
                k.id,
                k.title,
                k.content,
                k.image_url,
                k.difficulty,
                k.status,
                k.created_at,
                k.updated_at,
                kt.name as topic,
                k.topic_id
            FROM knowledge k
            LEFT JOIN knowledge_topics kt ON k.topic_id = kt.id
            WHERE k.id = $1
            LIMIT 1
        `
        
        const result = await query(sqlQuery, [id])

        console.log('Query result:', result)

        if (result.length === 0) {
            console.log('No article found with ID:', id)
            return NextResponse.json({
                success: false,
                error: 'Article not found'
            }, { status: 404 })
        }

        // Transform data to match frontend expectations
        const article = result[0]
        const transformedArticle = {
            id: article.id,
            title: article.title,
            content: article.content,
            image: article.image_url || "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            image_url: article.image_url,
            difficulty: article.difficulty,
            status: article.status,
            topic: article.topic,
            topic_id: article.topic_id,
            description: getTopicDisplayName(article.topic),
            created_at: article.created_at,
            updated_at: article.updated_at
        }

        console.log('Successfully fetched and transformed article:', transformedArticle.id, transformedArticle.title)

        return NextResponse.json({
            success: true,
            data: transformedArticle
        })
    } catch (error) {
        console.error('Error fetching knowledge article:', error)
        return NextResponse.json({
            success: false,
            error: 'Internal server error',
            details: error.message
        }, { status: 500 })
    }
}

// Helper function
function getTopicDisplayName(topic) {
    const topicMap = {
        blockchain: 'Blockchain',
        defi: 'DeFi', 
        copy_trade: 'Copy Trade',
        ai: 'AI'
    }
    return topicMap[topic] || topic
}

