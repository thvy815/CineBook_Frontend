import * as signalR from "@microsoft/signalr";

class SeatSocket {
  connection: signalR.HubConnection | null = null;

  connect(
    showtimeId: string,
    onSeatUpdated: (data: any) => void
  ) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:5001/seatHub?showtimeId=${showtimeId}`)
      .withAutomaticReconnect()
      .build();

    this.connection.on("SeatUpdated", onSeatUpdated);

    
    this.connection.start().catch((err: unknown) => {
    console.error("SignalR connect error:", err);});
  }

  lockSeat(showtimeId: string, seatId: string, userId: string) {
    return this.connection?.invoke("LockSeat", showtimeId, seatId, userId);
  }

  releaseSeat(showtimeId: string, seatId: string, userId: string) {
    return this.connection?.invoke("ReleaseSeat", showtimeId, seatId, userId);
  }
}

export const seatSocket = new SeatSocket();
