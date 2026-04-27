import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/sign-in');
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    const emailError = page.locator('text=Поле обязательно').first();
    const passwordError = page.locator('text=Поле обязательно').last();

    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });

  test('should show error for invalid email format', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');

    const error = page.locator('text=Недопустимый адрес почты');
    await expect(error).toBeVisible();
  });

  test('should show error for non-existent user', async ({ page }) => {
    await page.fill('input[name="email"]', 'nonexistent@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Ожидаем общее сообщение об ошибке (оно может прийти от API)
    // В нашем SignInForm мы выводим общую ошибку через form.setError('root', ...)
    const error = page.locator('text=Введены неверные данные');
    await expect(error).toBeVisible();
  });
});
