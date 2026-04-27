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

test.describe('Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/sign-up');
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');
    const errors = page.locator('text=Поле обязательно');
    await expect(errors).toHaveCount(3);
  });

  test('should show error if passwords do not match', async ({ page }) => {
    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'mismatch');
    await page.click('button[type="submit"]');

    const error = page.locator('text=Пароли не совпадают');
    await expect(error).toBeVisible();
  });
});
