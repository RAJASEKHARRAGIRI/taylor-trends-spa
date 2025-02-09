export interface CartProceedToPay {
    totalPrice: number;
    totalCartPrice: number;
    totalCartPercent: number;
    totalItems: number;
    currentState: string;
    address: any;
    paymentDetails: any;
  }