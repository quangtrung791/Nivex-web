import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all';
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || '1';

    const wp = new URL('https://nivexhub.learningchain.vn/wp-json/nivex/v1/courses');
    wp.searchParams.set('filter', filter);
    if (search) wp.searchParams.set('search', search);
    // wp.searchParams.set('page', page);
    // wp.searchParams.set('per_page', '30');

    const res = await fetch(wp.toString(), { next: { revalidate: 5 } });
    const json = await res.json();

    // if (!res.ok || !json.success) {
    //   return NextResponse.json(
    //     { success: false, error: json.error || 'WP API error' },
    //     { status: 500 }
    //   );
    // }

    const courses = (json.data || []).map((course) => ({
      id: course.id,
      title: course.title,
      type: course.type,
      category: course.category || '',
      status: course.status,
      date: course.date,
      start_date: course.start_date,
      end_date: course.end_date,
      link_zoom: course.link_zoom,
      content: course.content || '',
      image: course.image || '/assets/images/background/course_image_test1.png',
      buttonText: course.buttonText || 'Xem ngay',
    }));

    return NextResponse.json({ success: true, data: courses, meta: json.meta });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách khóa học', details: String(error?.message || error) },
      { status: 500 }
    );
  }
}
