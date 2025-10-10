import { query } from "@/app/lib/neon";
import { slugify, generateUniqueSlug } from "@/utils/slugify";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // if (!slug) {
    //   return NextResponse.json(
    //     { error: "Thiếu slug" },
    //     { status: 400 }
    //   );
    // }

    // console.log("GET /api/admin/dictionary called");
    
    // Query
    if (slug) {
      console.log(`GET /api/admin/dictionary?slug=${slug}`);
      
      const rows = await query(
        "SELECT * FROM public.dictionary WHERE slug = $1 LIMIT 1",
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
        keyword: row.keyword,
        short_desc: row.short_desc,
        description: row.description || "",
        created_at: row.created_at,
        updated_at: row.updated_at,
      });
    }
    // const rows = await query('SELECT * FROM public.dictionary ORDER BY id ASC');

    // TH ko có slug
    const rows = await query(
      "SELECT * FROM public.dictionary ORDER BY id ASC"
    );

    const dictionary = rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      keyword: row.keyword,
      short_desc: row.short_desc,
      description: row.description || "",
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
  
    
    console.log("Returning event:", dictionary.length);
    
    return NextResponse.json(dictionary, {
      headers: {
        'X-Total-Count': String(dictionary.length),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    });
    
  } catch (error) {
    console.error("GET /api/admin/dictionary error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  let slugCustom;
  try {
    const data = await request.json();
    console.log("POST /api/admin/dictionary - data:", data);

    if(!data.slug || data.slug === null) {
      slugCustom = slugify(data.keyword)
    }

     // Tránh slug bị ttrùng
    const checkSlugExists = async (checkSlug) => {
      const existing = await query(
        'SELECT id FROM public.dictionary WHERE slug = $1',
        [checkSlug]
      );
      return existing.length > 0;
    };
    
    slugCustom = await generateUniqueSlug(slugCustom, checkSlugExists);
    
    // Insert into dictionary table
    const result = await query(
      'INSERT INTO public.dictionary (slug, keyword, short_desc, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        data.slug || slugCustom,
        data.keyword || 'Untitled',
        data.short_desc || "null",
        data.description || ''
      ]
    );
    
    // Return the created course
    // console.log(slugCustom)
    const n = result[0];
    
    return NextResponse.json( n,
       { status: 201 });
    
  } catch (error) {
    console.error("POST /api/admin/dictionary error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}
