// ทดลองสร้างปุ่มกด

"use client";

type ButtonComponentProps = {
	label?: string;
};

export default function ButtonComponent({
	label = "ปุ่มทดลอง",
}: ButtonComponentProps) {
	function handleClick() {
		console.log("clicked");
	}

	return (
		<button type="button" onClick={handleClick}>
			{label}
		</button>
	);
}
