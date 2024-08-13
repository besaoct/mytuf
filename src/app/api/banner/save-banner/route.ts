import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

interface BannerSettings {
  is_visible: boolean;
  description: string;
  timer: number;
  link: string;
  bannerUsername: string;
}

export async function POST(req: Request) {
  try {

    const data: BannerSettings = await req.json();
    const { is_visible, description, timer, link, bannerUsername } = data;

    if (!bannerUsername) {
      return NextResponse.json({ error: 'Banner username is required' }, { status: 400 });
    }

    const startdate = new Date(); 
    const enddate = new Date(startdate.getTime() + timer * 1000);

    await pool.query(
      `INSERT INTO banner_settings (banner_username, is_visible, description, link, startdate, enddate, timer)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       is_visible = VALUES(is_visible),
       description = VALUES(description),
       link = VALUES(link),
       startdate = VALUES(startdate),
       enddate = VALUES(enddate),
       timer = VALUES(timer)`,
      [bannerUsername, is_visible, description, link, startdate, enddate, timer]
    );

    return NextResponse.json({ message: 'Settings saved successfully' });

  } catch (error) {
    console.error('Error saving banner settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
