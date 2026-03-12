import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useProduct() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useModules() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["modules"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAvailableModules();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: {
      customerName: string;
      email: string;
      phone: string;
      address: string;
      material: string;
      color: string;
      selectedModules: string[];
      quantity: bigint;
      productType: string;
      totalPrice: bigint;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.placeOrder(
        params.customerName,
        params.email,
        params.phone,
        params.address,
        params.material,
        params.color,
        params.selectedModules,
        params.quantity,
        params.productType,
        params.totalPrice,
      );
    },
  });
}
