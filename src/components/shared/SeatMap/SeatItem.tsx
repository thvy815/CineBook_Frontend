type Props = {
   seatId: string;   
    seatNumber: string;
    rowLabel: string;
    columnIndex: number;

    // FIX 1: cho phép cả 3 trạng thái
    status?: "available" | "locked" | "booked";

    // FIX 2: cho type là string (từ API)
    type: string;

    owner?: string;
     isSelected: boolean;   
    onSelect: () => void;
};

export default function SeatItem({
    seatNumber,
    status,
    type,
    isSelected,
    onSelect
}: Props) {
    const bg =
        status === "booked"
            ? "bg-red-600" :
        status === "locked"
            ? "bg-yellow-500" :
        isSelected
            ? "bg-green-600"
            : "bg-gray-500";

    return (
        <div
            className={`p-3 m-1 rounded text-white cursor-pointer ${bg}`}
            onClick={onSelect}
        >
            {seatNumber}
        </div>
    );
}
