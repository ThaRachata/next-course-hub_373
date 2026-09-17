// เพิ่มเกมใหม่ หรือแก้ไขเกมที่มีอยู่แล้ว
"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Game, GameStatus } from "@/types/game";

// สร้างประเภท GameDraft มาพักข้อมูลเกมที่ผู้ใช้กรอกในฟอร์มก่อนที่จะบันทึกลงฐานข้อมูล
export type GameDraft = {
  title: string;
  platform: string;
  hours: string;
  status: GameStatus;
};

type GameFormProps = {
  initialGame?: Game;  // ถ้ามี initialGame จะเป็นการแก้ไขเกมที่มีอยู่แล้ว ถ้าไม่มี initialGame จะเป็นการเพิ่มเกมใหม่
  onSave: (draft: GameDraft) => void;
  onCancel?: () => void;
};

type FormErrors = Partial<Record<keyof GameDraft, string>>;
// ค่าของ draft สำหรับเพิ่มเกมใหม่
const emptyDraft: GameDraft = {
  title: "",
  platform: "",
  hours: "",
  status: "not-started",
};

const platformOptions = ["PC", "Nintendo Switch"];

// ฟังก์ชันเพื่อแปลง Game เป็น GameDraft
function toDraft(game?: Game): GameDraft {
  if (!game) {
    return emptyDraft;
  }

  return {
    title: game.title,
    platform: game.platform,
    hours: String(game.hours),
    status: game.status,
  };
}
// คอมโพเนนต์ GameForm สำหรับเพิ่มเกมใหม่ หรือแก้ไขเกมที่มีอยู่แล้ว
export default function GameForm({
  initialGame,
  onSave,
  onCancel,
}: GameFormProps) {
  // ใช้ useState เพื่อเก็บข้อมูล draft ของเกมที่ผู้ใช้กรอกในฟอร์ม และ errors สำหรับเก็บข้อความแสดงข้อผิดพลาด
  const [draft, setDraft] = useState<GameDraft>(() => toDraft(initialGame));
  const [errors, setErrors] = useState<FormErrors>({});

  // ฟังก์ชัน validate เพื่อตรวจสอบความถูกต้องของข้อมูล
  function validate(value: GameDraft): FormErrors {
    const nextErrors: FormErrors = {};
    const hours = Number(value.hours);

    if (!value.title.trim()) {
      nextErrors.title = "กรุณากรอกชื่อเกม";
    }
    // ตรวจสอบว่าค่าของ platform ไม่เป็นค่าว่างหรือมีแต่ช่องว่าง
    if (!value.platform.trim()) {
      nextErrors.platform = "กรุณากรอกแพลตฟอร์ม";
    }
    // ตรวจสอบว่าค่าของ hours เป็นจำนวนเต็มบวกหรือไม่
    if (!Number.isInteger(hours) || hours <= 0) {
      nextErrors.hours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
    }
    return nextErrors;
  }

  // ฟังก์ชัน handleChange เมื่ออัปเดตค่า draft จะลบข้อความแสดงข้อผิดพลาดเมื่อผู้ใช้แก้ไขข้อมูลในฟอร์ม
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setDraft((previousDraft) => ({
      ...previousDraft,
      [name as keyof GameDraft]: value, 
    }));
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
  }

  // ฟังก์ชัน handleSubmit เพื่อบันทึกข้อมูลเกมเมื่อผู้ใช้กดปุ่มบันทึก
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บเมื่อส่งฟอร์ม
    const nextErrors = validate(draft); // ตรวจสอบความถูกต้องของข้อมูล draft และเก็บข้อความแสดงข้อผิดพลาดใน nextErrors
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  const formTitle = initialGame ? "แก้ไขเกม" : "เพิ่มเกม"; // ถ้ามี initialGame จะเป็นการแก้ไขเกมที่มีอยู่แล้ว ถ้าไม่มี initialGame จะเป็นการเพิ่มเกมใหม่

return (
    <form
      className={`gameForm ${initialGame ? "isEditing" : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <h2>{formTitle}</h2>
      
      <label htmlFor="game-title">
        ชื่อเกม
        <div className="input-wrapper">
          <input
            id="game-title"
            name="title"
            value={draft.title}
            onChange={handleChange}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "game-title-error" : undefined}
          />
          {errors.title && (
            <p className="formError" id="game-title-error" role="alert">
              {errors.title}
            </p>
          )}
        </div>
      </label>

      <label htmlFor="game-form-platform">
        แพลตฟอร์ม
        <div className="input-wrapper">
          <select
            id="game-form-platform"
            name="platform"
            value={draft.platform}
            onChange={handleChange}
            aria-invalid={!!errors.platform}
            aria-describedby={errors.platform ? "game-platform-error" : undefined}
          >
            <option value="">เลือกแพลตฟอร์ม</option>
            {platformOptions.map((platformOption) => (
              <option key={platformOption} value={platformOption}>
                {platformOption}
              </option>
            ))}
          </select>
          {errors.platform && (
            <p className="formError" id="game-platform-error" role="alert">
              {errors.platform}
            </p>
          )}
        </div>
      </label>

      <label htmlFor="game-hours">
        จำนวนชั่วโมงที่คาดว่าจะเล่น
        <div className="input-wrapper">
          <input
            id="game-hours"
            name="hours"
            type="number"
            min="1"
            value={draft.hours}
            onChange={handleChange}
            aria-invalid={!!errors.hours}
            aria-describedby={errors.hours ? "game-hours-error" : undefined}
          />
          {errors.hours && (
            <p className="formError" id="game-hours-error" role="alert">
              {errors.hours}
            </p>
          )}
        </div>
      </label>

      <label htmlFor="game-status">
        สถานะ
        <select
          id="game-status"
          name="status"
          value={draft.status}
          onChange={handleChange}
        >
          <option value="not-started">ยังไม่เริ่ม</option>
          <option value="playing">กำลังเล่น</option>
          <option value="completed">เล่นจบแล้ว</option>
        </select>
      </label>

      <button type="submit">บันทึก</button>
      {initialGame && onCancel && (
        <button type="button" onClick={onCancel}>
          ยกเลิก
        </button>
      )}
    </form>
  );
}
