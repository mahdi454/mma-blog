"use client"
import React, { useState } from 'react';

import { useUser } from '@/hooks/useUser';
import { Article } from '@/utils/types';
import { articleService } from '@/services/articleService';
import ArticleForm from './ArticleForm';
import withAuth from '../withAuth';

function NewArticle() {
  const { user } = useUser();
  const [formData, setFormData] = useState<Partial<Article>>({
    category: 'UFC',
    badge: 'Normal',
    keywords:"",
    blocks: [], 

  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      if (!user) throw new Error('You must be logged in to create articles');

      await articleService.createArticle({
        ...formData,
        author_id: user.id
      } as Article);

      setSuccess(true);
      setFormData({
        category: 'UFC',
        badge: 'Normal',
        keywords:'',
        blocks: [],

      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ArticleForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
      success={success}
    />
  );
}

export default withAuth(NewArticle);