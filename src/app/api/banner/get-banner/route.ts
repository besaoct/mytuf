import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

interface BannerSettings {
  is_visible: boolean;
  description: string;
  timer: number;
  link: string;
  bannerUsername: string;
  updated_at: string;
  startdate: string;
  enddate: string;
}

export async function GET(req: Request) {   
 const url = new URL(req.url);
  try {


    const bannerUsername = url.searchParams.get('banner_username');

    if (!bannerUsername) {
      return NextResponse.json({ error: 'Banner username is required' }, { status: 400 });
    }

    // Query the database
    const [rows] = await pool.query('SELECT * FROM banner_settings WHERE banner_username = ?', [bannerUsername]);
   
    // console.log('Raw database response:', rows);  
    // (shafin @besaoct )

    const results = rows as BannerSettings[];

    if (results.length === 0) {
      return NextResponse.json({ error: 'Banner settings not found' }, { status: 404 });
    }
    // since we expect a unique banner_username: 
    const bannerSettings = results[0];

    return NextResponse.json(bannerSettings);

  } catch (error) {
    console.error('Error fetching banner settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
