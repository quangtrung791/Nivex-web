import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";
import { sendEmail } from '@/lib/emailService';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    console.log("GET /api/admin/news called");
    
    // Query courses table with explicit schema
    const rows = await query('SELECT * FROM public.news ORDER BY id ASC');
    
    // Transform courses data for React Admin
    const news = rows.map(row => ({
      id: row.id,
      title: row.title,
      category_id: row.category_id || [],
      status: row.status || 'active',
      content: row.content || '',
      author: row.author || 'admin',
      thumbnail_url: row.thumbnail_url,
      time_upload: row.time_upload,
      created_at: row.created_at,
      updated_at: row.updated_at      
    }));
    
    console.log("Returning news:", news.length);
    
    return NextResponse.json(news, {
      headers: {
        'X-Total-Count': String(news.length),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    });
    
  } catch (error) {
    console.error("GET /api/admin/news error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  // backdoor cho con quần què n8n
  const validKey = process.env.N8N_API_KEY;
  const apiKey = request.headers.get('x-api-key');

  if (apiKey !== validKey) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized - Invalid API Key' },
      { status: 401 }
    )
  }

  try {
    const data = await request.json();
    console.log("POST /api/admin/news - data:", data);

    const { title, content } = data;

    if (!title || !content) {
      return NextResponse.json({
        success: false, 
        error: 'Thiếu tiêu đề hoặc nội dung.' 
      }, { status: 400 })
    }
    
    // Insert into news table
    const result = await query(
      'INSERT INTO public.news (title, category_id, status, content, author, thumbnail_url, time_upload) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        data.title || 'Untitled',
        data.category_id || '',
        data.status || 'active',
        data.content || '',
        data.author || 'admin',
        data.thumbnail_url || null,
        data.time_upload || '01/01/1990'
      ]
    );
    
    // Return the created course
    const n = Array.isArray(result) ? result[0] : result.rows?.[0];
    if (!n) {
      throw new Error('Không có dữ liệu bài viết');
    }

    // Lấy danh sách email subscriber
    const subs = await query('SELECT email FROM public.subscribe');
    const subscribers = Array.isArray(subs)
      ? subs.map(s => s.email)
      : subs.rows.map(s => s.email);

    if (subscribers.length === 0) {
      console.log('Không có email đăng ký, bỏ qua gửi email');
    }

    // email content
    const subject = `Thông báo bài viết mới từ Nivex: ${n.title}`;
    const htmlContent = `
      <div style="font-family:Arial,sans-serif;">
        <h2>${n.title}</h2>
        <p>${n.content.substring(0, 200)}...</p>
          <a href="https://nivex.vn/tin-tuc/${n.id}"
            style="background:#0070f3;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;">
            Xem chi tiết
          </a>
          <hr>
          <p style="font-size:12px;color:#777">Bạn nhận được email này vì đã đăng ký nhận tin tại website Nivex.vn.</p>
        </div>
      `;
      const textContent = `${n.title}\n\n${n.content.substring(0, 200)}...\nXem chi tiết: https://nivex.vn/tin-tuc/${n.id}`;
    

    // Thực thi gửi email
    const emailPromises = subscribers.map(email =>
      sendEmail(email, subject, htmlContent, textContent)
    );
    await Promise.allSettled(emailPromises);

    console.log(`Đã gửi email thông báo đến ${subscribers.length} người đăng ký.`);
    
    // return NextResponse.json(n, { status: 201 });
    return NextResponse.json({
      success: true,
      message: `Đã đăng bài và gửi thông báo đến ${subscribers.length} email.`,
    }, { status: 201 });

  } catch (error) {
    console.error("POST /api/admin/news error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}
