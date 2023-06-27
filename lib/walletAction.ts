import { toast } from "react-toastify";

// Reset params so it auto closes, etc
// See https://github.com/fkhadra/react-toastify/blob/f0e64cc4da0db8385401a47e11eb96c016682f7d/src/core/toast.ts#L133C3-L139C5
const RESET_PARAMS = {
  isLoading: null,
  autoClose: null,
  closeOnClick: null,
  closeButton: null,
  draggable: null,
};

export async function performWalletAction<T>(action: () => Promise<T>) {
  const toastId = toast.loading("Please check your wallet to confirm...");
  try {
    const result = await action();

    toast.update(toastId, {
      ...RESET_PARAMS,
      render: "All is good",
      type: "success",
      data: result,
    });
    return result;
  } catch (error) {
    toast.update(toastId, {
      ...RESET_PARAMS,
      render: "Something went wrong",
      type: "error",
      data: error,
    });
  }
}

export function createWalletAction<T>(action: () => Promise<T>) {
  return async () => performWalletAction(action);
}
