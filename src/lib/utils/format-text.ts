export default function formatText(value?: string | number | null) {
    if (!value) return "N/A";

    return String(value)
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
}