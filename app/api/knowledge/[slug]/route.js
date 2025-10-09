import { NextResponse } from 'next/server'
import { query } from "@/app/lib/neon"

export const runtime = 'nodejs'

export async function GET(request, { params }) {
    try {
        // In Next.js 13+ App Router, params is a Promise
        const { slug } = await params

        if (!slug) {
            return NextResponse.json({
                success: false,
                error: 'Slug is required'
            }, { status: 400 })
        }

        // Fetch the article from database by slug with topic join
        const sqlQuery = `
            SELECT 
                k.id,
                k.title,
                k.slug,
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
            WHERE k.slug = $1 AND k.status = 'active'
            LIMIT 1
        `
        
        const result = await query(sqlQuery, [slug])


        if (result.length === 0) {
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
            slug: article.slug,
            content: article.content,
            image: article.image_url || "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            image_url: article.image_url,
            difficulty: article.difficulty,
            status: article.status,
            topic: article.topic,
            topic_id: article.topic_id,
            description: article.topic,
            created_at: article.created_at,
            updated_at: article.updated_at
        }

        return NextResponse.json({
            success: true,
            data: transformedArticle
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Internal server error',
            details: error.message
        }, { status: 500 })
    }
}

