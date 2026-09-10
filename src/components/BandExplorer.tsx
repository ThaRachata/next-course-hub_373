// จัดการช่องค้นหา รายการวงดนตรี, Filter, Empty State และ State ของการติดตาม
// ประกาศ use client เพื่อบอกว่า code นี้มีการโต้ตอบกับผู้ใช้และมีการใช้ useState
"use client";

import { useState } from "react";
import BandButtonComponent from "@/components/BandButtonComponent";
import BandCard from "@/components/BandCard";
import { favoriteBands } from "@/data/bands";

export default function BandExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [followedBandIds, setFollowedBandIds] = useState<number[]>([]);
  const [showFollowedOnly, setShowFollowedOnly] = useState(false);
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  // State สำหรับเก็บคำค้นหา
  // State สำหรับเก็บ ID ของวงดนตรีที่ติดตาม
  // State สำหรับเก็บสถานะการแสดงเฉพาะวงที่ติดตาม
  // State สำหรับเก็บจำนวน Like ของแต่ละวงดนตรี

  // จัดเรียงวงดนตรีตามตัวอักษร
  const sortedBands = [...favoriteBands].sort((firstBand, secondBand) =>
    firstBand.name.localeCompare(secondBand.name, undefined, {
      sensitivity: "base",
    }),
  );

  // คัดกรองวงดนตรีตามคำค้นหา
  const filteredBands = sortedBands.filter((band) => {
    const matchesSearch = band.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    // เช็คเงื่อนไขเช็คว่ากดติดตามหรือไม่
    const matchesFollowedFilter =
      !showFollowedOnly || followedBandIds.includes(band.id);

    return matchesSearch && matchesFollowedFilter;
  });

  // สถานะการติดตามของวงดนตรี
  const toggleFollow = (bandId: number) => {
    setFollowedBandIds((currentIds) =>
      currentIds.includes(bandId)
        ? currentIds.filter((id) => id !== bandId)
        : [...currentIds, bandId],
    );
  };
  // ฟังก์ชันสำหรับเพิ่มจำนวน Like ของวงดนตรี
  const addLike = (bandId: number) => {
    setLikeCounts((currentCounts) => ({
      ...currentCounts,
      [bandId]: (currentCounts[bandId] ?? 0) + 1,
    }));
  };

  // ฟังก์ชันสำหรับลบจำนวน Like ของวงดนตรี
  const removeLike = (bandId: number) => {
    setLikeCounts((currentCounts) => {
      const nextCount = Math.max((currentCounts[bandId] ?? 0) - 1, 0); // Math.max เพื่อให้ Like ไม่ต่ำกว่า 0

      // คืนค่าให้ React เพื่ออัปเดต state
      return {
        ...currentCounts,
        [bandId]: nextCount,
      };
    });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setShowFollowedOnly(false);
    setFollowedBandIds([]);
    setLikeCounts({});
  };

  return (
    <main className="bandExplorer">
      <h1>My Favorite Bands</h1>

      <div className="bandToolbar">
        <label className="bandSearchField" htmlFor="band-search">
          <span>ค้นหาชื่อวงดนตรี</span>
          <input
            id="band-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="กรอกชื่อวงดนตรี เช่น Polycat"
            className="bandSearchInput"
          />
        </label>
        <label className="followedOnlyField" htmlFor="followed-only">
          <input
            id="followed-only"
            type="checkbox"
            checked={showFollowedOnly}
            onChange={(event) => setShowFollowedOnly(event.target.checked)}
          />
          <span>แสดงเฉพาะวงที่กำลังติดตาม</span>
        </label>
        <button className="resetButton" type="button" onClick={resetFilters}>
          ล้างเงื่อนไข
        </button>
      </div>
      <p className="bandSummary">กำลังติดตาม {followedBandIds.length} วง</p>
      {/* ตรวจสอบว่ามีวงดนตรีที่ตรงกับคำค้นหาหรือไม่ */}
      {filteredBands.length === 0 ? (
        <p className="emptyState" role="status">
          {showFollowedOnly
            ? "ยังไม่มีวงที่กำลังติดตามตรงกับเงื่อนไข"
            : "ไม่พบวงดนตรีที่ตรงกับคำค้นหา"}
        </p>
      ) : (
        <section aria-label="รายการวงดนตรีที่ชื่นชอบ" className="bandGrid">
          {/* วนลูปแสดงรายการวงดนตรีที่ตรงกับคำค้นหา */}
          {filteredBands.map((band) => {
            const isFollowed = followedBandIds.includes(band.id);
            return (
              <div className="bandItem" key={band.id}>
                <BandCard band={band} />
                <BandButtonComponent
                  // ส่ง props ให้ BandButtonComponent เพื่อแสดงปุ่มต่างๆ
                  isFollowed={isFollowed}
                  likeCount={likeCounts[band.id] ?? 0}
                  onFollow={() => toggleFollow(band.id)}
                  onLike={() => addLike(band.id)}
                  onUnlike={() => removeLike(band.id)}
                />
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}