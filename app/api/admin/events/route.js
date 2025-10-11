import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";
import { slugify, generateUniqueSlug } from "@/utils/slugify";

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    // console.log("GET /api/admin/events called");
    
    // Query courses table with explicit schema
    // const rows = await query('SELECT * FROM public.event ORDER BY id ASC');
    if (slug) {
      // console.log(`GET /api/admin/dictionary?slug=${slug}`);
      
      const rows = await query(
        "SELECT * FROM public.event WHERE slug = $1 LIMIT 1",
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
        short_desc: row.short_desc,
        thumbnail_url: row.thumbnail_url,
        time_event: row.time_event,
        created_at: row.created_at,
        updated_at: row.updated_at,
      });
    }
    
    // TH ko có slug
    const rows = await query(
      "SELECT * FROM public.event ORDER BY id ASC"
    );

    const events = rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        content: row.content || "",
        short_desc: row.short_desc,
        thumbnail_url: row.thumbnail_url,
        time_event: row.time_event,
        created_at: row.created_at,
        updated_at: row.updated_at,
    }));

    return NextResponse.json(events, {
      headers: {
        'X-Total-Count': String(events.length),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    });
    
  } catch (error) {
    console.error("GET /api/admin/events error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("POST /api/admin/events - data:", data);

    let slugCustom;

    if(!data.slug || data.slug === null) {
          slugCustom = slugify(data.title)
        }
    
         // Tránh slug bị ttrùng
        const checkSlugExists = async (checkSlug) => {
          const existing = await query(
            'SELECT id FROM public.event WHERE slug = $1',
            [checkSlug]
          );
          return existing.length > 0;
        };
        
        slugCustom = await generateUniqueSlug(slugCustom, checkSlugExists);
    
    // Insert into events table
    const result = await query(
      'INSERT INTO public.event (slug, title, content, short_desc, thumbnail_url, time_event) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        data.slug || slugCustom,
        data.title || 'Untitled',
        data.content || '',
        data.short_desc || '',
        data.thumbnail_url || null,
        data.time_event || '01/01/1990'
      ]
    );
    
    // Return the created course
    const n = result[0];
    
    return NextResponse.json(n, { status: 201 });
    
  } catch (error) {
    console.error("POST /api/admin/events error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}
