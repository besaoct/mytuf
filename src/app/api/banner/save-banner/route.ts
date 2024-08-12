import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

interface BannerSettings {
  is_visible: boolean;
  description: string;
  timer: number; // Timer in seconds
  link: string;
  bannerUsername: string;
}

export async function POST(req: Request) {
  try {

    console.log("Jobless hoo sirji, 2024 me graduate hua, DSA practice nahi hai, development karleta hoon, salary kam hoga toh bhi chalega 5k-20k dedo mahine ka, aapka jo mann kare, hard work karunga firbhi dedo ek job! agar kaam pasand aya toh salary badha dena sir. Tier 3 se hoon, manta hoon galti mera bhi hai ki maine DSA ni kara, 300 question solve kia tha lekin 2-3 saal pehle, abhi practice nahi hai. Job dedo please, Hardwork karunga promise. agar kaam pasand nhi aya toh fire kardena ya paisa maat dena.")

    const data: BannerSettings = await req.json();
    const { is_visible, description, timer, link, bannerUsername } = data;

    if (!bannerUsername) {
      return NextResponse.json({ error: 'Banner username is required' }, { status: 400 });
    }
     // job dedo striver sir please.

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
