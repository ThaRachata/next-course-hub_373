// จัดการปุ่มติดตามและปุ่ม Like

// กำหนดประเภทของ ข้อมูล ที่ component นี้จะรับเข้ามา
type BandButtonComponentProps = {
  isFollowed: boolean;
  likeCount: number;
  onFollow: () => void;
  onLike: () => void;
  onUnlike: () => void;
};

// สร้าง component สำหรับปุ่มติดตามและปุ่ม Like
export default function BandButtonComponent({
  isFollowed,
  likeCount,
  onFollow,
  onLike,
  onUnlike,
}: BandButtonComponentProps) {
  return (
    <div className="bandActions">
      <button
        className={`bandActionButton ${isFollowed ? "unfollowButton" : "followButton"}`}
        type="button"
        onClick={onFollow}
        aria-pressed={isFollowed}
      >
        {isFollowed ? "เลิกติดตาม" : "ติดตาม"} {/* เช็คสถานะการติดตาม */}
      </button>
      <button
        className="bandActionButton likeButton"
        type="button"
        onClick={onLike}
      >
        <span aria-hidden="true">♥</span> Like {likeCount}
      </button>
      <button
        className="bandActionButton unlikeButton"
        type="button"
        onClick={onUnlike}
        disabled={likeCount === 0} 
        // ปุ่ม Unlike จะถูกปิดใช้งานเมื่อ likeCount เป็น 0
      >
        Unlike {/* ปุ่มยกเลิกการ like */}
      </button>
    </div>
  );
}
