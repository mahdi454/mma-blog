"use server";
import { validatedAction } from '@/lib/validate';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const newArticleSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string(),
  image_url: z.string().optional(),
  author_id: z.string().optional(),
  badge: z.string().optional(),
});

export const createNewArticle = (user: { id: string }) =>
  validatedAction(newArticleSchema, async (data) => {
    if (!user || !user.id) {
      return { error: 'User not authenticated.' };
    }

    const supabase = await createClient();

    const { error: articleError } = await supabase
      .from('articles')
      .insert({
        ...data,
        published: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author_id: user.id,
      })
      .select()
      .single();

    if (articleError) {
      return { error: articleError.message };
    }

    const { error: userDataError } = await supabase
      .from('user_data')
      .insert({ user_id: user.id });

    if (userDataError) {
      console.error('Error creating user_data entry:', userDataError);
      return { error: 'Failed to create user_data entry.' };
    }

    redirect('/admin');
  });
