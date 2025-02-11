import { memo } from "react";
import logo from "@assets/EXPERMED.webp";
import { Input } from "@presentation/components/form/input";
import { Button } from "@presentation/components/button";

const Register = memo(() => {
  return (
    <div className="flex w-100 h-full items-center justify-center">
      <div className="w-[30dvw] flex flex-col gap-6 p-4 bg-white rounded-lg shadow-xl">
        <div>
          <picture className="w-100 h-12">
            <img src={logo} alt="Login logo" />
          </picture>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <Input
              className="text-xs font-medium"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Input
              className="w-100 border-white"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <Input
              className="text-xs font-medium"
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <Button className="text-white">Register</Button>
      </div>
    </div>
  );
});

export { Register };
