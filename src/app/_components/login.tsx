"use client"

import { useEffect, useState } from 'react';
import { api } from '@/trpc/react';
import { Announcement } from "@/types/announcement";
// Add when using implement nextAuth for role based auth

const LoginPage: React.FC = () => {
  return (
    <div className='text-center max-w-md mx-auto'>
      <h2 className='text-lg'>Login page</h2>
    </div>
  );
};

export default LoginPage;
