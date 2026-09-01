// กำหนดประเภทข้อมูลสำหรับสมาชิกวงดนตรี
export type BandMember = {
  name: string;
  role: string;
  imageUrl: string; 
};

// กำหนดประเภทข้อมูลสำหรับวงดนตรี
export type Band = {
  id: number;
  name: string;
  hitSong: string;
  imageUrl: string; 
  members: BandMember[]; 
};