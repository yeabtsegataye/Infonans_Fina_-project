import { SetMetadata } from '@nestjs/common';
// setting bypass for public routs the Public word can be changed 
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
