"use client";

// 1  import ทั้งหมด
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Course } from "@/types/course";

// 2  type ของ Props และ type ของข้อมูลในฟอร์ม
type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel?: () => void;
};

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

type FormErrors = Partial<Record<keyof CourseDraft, string>>;

export const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

function toDraft(course?: Course): CourseDraft {
  if (!course) {
    return emptyDraft;
  }

  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  // 3  State ของฟอร์มและ State ของข้อความแจ้งเตือน
  const [draft, setDraft] = useState<CourseDraft>(() => toDraft(initialCourse));
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState("");

  // 4  ฟังก์ชันตรวจสอบความถูกต้อง
  function validate(value: CourseDraft): FormErrors {
    const nextErrors: FormErrors = {};

    if (value.code.trim() === "") {
      nextErrors.code = "กรุณากรอกรหัสวิชา";
    }

    if (value.name.trim() === "") {
      nextErrors.name = "กรุณากรอกชื่อวิชา";
    }

    if (value.instructor.trim() === "") {
      nextErrors.instructor = "กรุณากรอกชื่อผู้สอน";
    }

    const credit = Number(value.credit);
    if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
      nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มระหว่าง 1 ถึง 6";
    }

    return nextErrors;
  }

  // 5  ฟังก์ชัน handle สำหรับเหตุการณ์ต่าง ๆ
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((previousDraft) => ({
      ...previousDraft,
      [name as keyof CourseDraft]: value,
    }));
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setSuccess("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(draft);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
    setSuccess("บันทึกข้อมูลเรียบร้อยแล้ว");
  }

  // 6  return ส่วนแสดงผล
  return (
    <form className="courseForm" onSubmit={handleSubmit} noValidate>
      <h2>เพิ่มรายวิชา</h2>
      <label htmlFor="code">
        รหัสวิชา
        <input
          id="code"
          name="code"
          type="text"
          value={draft.code}
          onChange={handleChange}
          aria-invalid={!!errors.code}
          aria-describedby={errors.code ? "code-error" : undefined}
          required
        />
      </label>
      {errors.code && (
        <p id="code-error" role="alert">
          {errors.code}
        </p>
      )}
      <label htmlFor="name">
        ชื่อวิชา
        <input
          id="name"
          name="name"
          type="text"
          value={draft.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
        />
      </label>
      {errors.name && (
        <p id="name-error" role="alert">
          {errors.name}
        </p>
      )}
      <label htmlFor="credit">
        หน่วยกิต
        <input
          id="credit"
          name="credit"
          type="number"
          min="1"
          max="6"
          value={draft.credit}
          onChange={handleChange}
          aria-invalid={!!errors.credit}
          aria-describedby={errors.credit ? "credit-error" : undefined}
          required
        />
      </label>
      {errors.credit && (
        <p id="credit-error" role="alert">
          {errors.credit}
        </p>
      )}
      <label htmlFor="instructor">
        ผู้สอน
        <input
          id="instructor"
          name="instructor"
          type="text"
          value={draft.instructor}
          onChange={handleChange}
          aria-invalid={!!errors.instructor}
          aria-describedby={errors.instructor ? "instructor-error" : undefined}
          required
        />
      </label>
      {errors.instructor && (
        <p id="instructor-error" role="alert">
          {errors.instructor}
        </p>
      )}
      <button type="submit">บันทึก</button>
      {initialCourse && onCancel ? (
        <button type="button" onClick={onCancel}>
          ยกเลิก
        </button>
      ) : null}
      {success && <p role="status">{success}</p>}
    </form>
  );
}
