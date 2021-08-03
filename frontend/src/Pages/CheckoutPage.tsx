import React from "react";
import { CenterContainer } from "../components/Common";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { usePageTitle } from "../hooks/usePageTitle";
import { selectUser } from "../redux/slices/userSlice";

export const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(selectUser);
  usePageTitle("Checkout");
  return <CenterContainer>Checkout</CenterContainer>;
};
