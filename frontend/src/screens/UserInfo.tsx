import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { selectUser } from "../redux/slices/userSlice";

export const UserInfo: React.FC = () => {
  const { user } = useAppSelector(selectUser);
  return (
    <div>
      <ul>
        {Object.keys(user).map((key) => (
          <li>
            {key}: {user[key]}
          </li>
        ))}
      </ul>
    </div>
  );
};
