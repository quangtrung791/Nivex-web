import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";
import { sendEmail } from '@/lib/emailService';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    
    // console.log("GET /api/admin/news called");
    
    // Query courses table with explicit schema
    // const rows = await query('SELECT * FROM public.news ORDER BY id ASC');
    
    // Transform courses data for React Admin
    if (slug) {     
      const rows = await query(
        "SELECT * FROM public.news WHERE slug = $1 LIMIT 1",
        [slug]
      );

      if (rows.length === 0) {
        return NextResponse.json(
          { error: "Không tìm thấy slug này" },
          { status: 404 }
        );
      }

      const row = rows[0];
      return NextResponse.json({
        id: row.id,
        slug: row.slug,
        title: row.title,
        content: row.content || "",
        thumbnail_url: row.thumbnail_url,
        author: row.author,
        time_upload: row.time_upload,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
        category_id: row.category_id
      });
    }
    
    // TH ko có slug
    const rows = await query(
      "SELECT * FROM public.news ORDER BY id ASC"
    );

    const news = rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        content: row.content || "",
        thumbnail_url: row.thumbnail_url,
        author: row.author,
        time_upload: row.time_upload,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
        category_id: row.category_id
    }));
    
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
    
    const now = new Date();
    // Cộng thêm 7 tiếng để ra giờ Việt Nam (GMT+7)
    const vnTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    const serverTime = vnTime.toISOString(); // định dạng ISO chuẩn PostgreSQL
    
    const timeUpload = data.time_upload ? new Date(data.time_upload).toISOString() : serverTime;
    // Insert into news table
    // const result = await query(
    //   'INSERT INTO public.news (slug, title, category_id, status, content, author, thumbnail_url, time_upload) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    //   [
    //     data.slug,
    //     data.title || 'Untitled',
    //     data.category_id || '',
    //     data.status || 'active',
    //     data.content || '',
    //     data.author || 'admin',
    //     data.thumbnail_url || null,
    //     timeUpload
    //   ]
    // );
    const result = await query(
      `
      INSERT INTO public.news 
      (slug, title, category_id, status, content, author, thumbnail_url, time_upload)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        data.slug,
        data.title || 'Untitled',
        data.category_id || '',
        data.status || 'active',
        data.content || '',
        data.author || 'admin',
        data.thumbnail_url || null,
        timeUpload
      ]
    );

    
    // Return the created course
    // const n = Array.isArray(result) ? result[0] : result.rows?.[0];
    const n = Array.isArray(result) ? result[0] : result?.rows?.[0];

    if (!n) {
      throw new Error('Không có dữ liệu bài viết');
    }

    // Lấy danh sách email subscriber
    const subs = await query('SELECT email FROM public.subscribe');
    // const subscribers = Array.isArray(subs)
    //   ? subs.map(s => s.email)
    //   : subs.rows.map(s => s.email);
    const subscribers = Array.isArray(subs)
      ? subs.map(s => s.email)
      : subs?.rows?.map(s => s.email) || [];

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

// export async function POST(request) {
//   // unified authorization: accepts N8N_API_KEY / ADMIN_API_KEY (header) OR browser cookies
//   if (!isAuthorized(request)) {
//     return NextResponse.json({ success: false, error: 'Unauthorized - Invalid API Key or not authenticated' }, { status: 401 })
//   }

//   try {
//     const data = await request.json();
//     console.log("POST /api/admin/news - data:", data);

//     const { title, content } = data;

//     if (!title || !content) {
//       return NextResponse.json({
//         success: false, 
//         error: 'Thiếu tiêu đề hoặc nội dung.' 
//       }, { status: 400 })
//     }
    
//     // Insert into news table
//     const result = await query(
//       'INSERT INTO public.news (title, category_id, status, content, author, thumbnail_url, time_upload) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
//       [
//         data.title || 'Untitled',
//         data.category_id || '',
//         data.status || 'active',
//         data.content || '',
//         data.author || 'admin',
//         data.thumbnail_url || null,
//         data.time_upload || '01/01/1990'
//       ]
//     );
    
//     // Return the created course
//     const n = Array.isArray(result) ? result[0] : result.rows?.[0];
//     if (!n) {
//       throw new Error('Không có dữ liệu bài viết');
//     }

//     // Lấy danh sách email subscriber
//     const subs = await query('SELECT email FROM public.subscribe');
//     const subscribers = Array.isArray(subs)
//       ? subs.map(s => s.email)
//       : subs.rows.map(s => s.email);

//     if (subscribers.length === 0) {
//       console.log('Không có email đăng ký, bỏ qua gửi email');
//     }

//     // email content
//     const subject = `Thông báo bài viết mới từ Nivex: ${n.title}`;
//     const htmlContent = `
//       <div style="font-family:Arial,sans-serif;">
//         <h2>${n.title}</h2>
//         <p>${n.content.substring(0, 200)}...</p>
//           <a href="https://nivex.vn/tin-tuc/${n.id}"
//             style="background:#0070f3;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;">
//             Xem chi tiết
//           </a>
//           <hr>
//           <p style="font-size:12px;color:#777">Bạn nhận được email này vì đã đăng ký nhận tin tại website Nivex.vn.</p>
//         </div>
//       `;
//       const textContent = `${n.title}\n\n${n.content.substring(0, 200)}...\nXem chi tiết: https://nivex.vn/tin-tuc/${n.id}`;
    

//     // Thực thi gửi email
//     const emailPromises = subscribers.map(email =>
//       sendEmail(email, subject, htmlContent, textContent)
//     );
//     await Promise.allSettled(emailPromises);

//     console.log(`Đã gửi email thông báo đến ${subscribers.length} người đăng ký.`);
    
//     // return NextResponse.json(n, { status: 201 });
//     return NextResponse.json({
//       success: true,
//       message: `Đã đăng bài và gửi thông báo đến ${subscribers.length} email.`,
//     }, { status: 201 });

//   } catch (error) {
//     console.error("POST /api/admin/news error:", error);
//     return NextResponse.json({
//       ok: false,
//       error: error.message
//     }, { status: 500 });
//   }
// }
