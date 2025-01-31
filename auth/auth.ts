'use server';

import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from '@/auth/definitions';
import { createSession } from './session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signup(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { firstName, LastName, email, password } = validatedFields.data;

  // 3. Insert the user into the database or call an Auth Provider's API

  const response = await fetch("http://localhost:8080/api/admin/users/register", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
      firstName: firstName,
      lastName: LastName
    })
  });

  const responseData = await response.json();

  if(response.status != 201) {
    return {
      message: 'An error occurred while creating your account.',
    };
  } 

  // 4. Create a session for the user
  const userId = responseData.id.toString();
  await createSession(userId);
}

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  const errorMessage = { message: 'Invalid login credentials.' };

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data;

  // 2. Query the database for the user with the given email
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  });

  const responseData = await response.json();

  // If user is not found, return early
  if (response.status != 200) {
    return errorMessage;
  }

  // 4. If login successful, create a session for the user and redirect
  const userId = responseData.token.toString();
  await createSession(userId);
}

export async function logout() {
  // delate cookies doesnt work on server-only (idk why)
  (await cookies()).delete('session');
  redirect('/sign-in');
}