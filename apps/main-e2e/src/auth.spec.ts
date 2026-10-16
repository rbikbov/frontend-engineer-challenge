import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/sign-in');
    await page.waitForLoadState('networkidle');
    // Give hydration time to finish, especially important for WebKit
    await expect(
      page.getByRole('form', { name: 'sign-in-form' }),
    ).toBeVisible();
    if (test.info().project.name === 'webkit') {
      await page.waitForTimeout(2500);
    }
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.getByTestId('email-error')).toHaveText(
      'This field is required',
    );
    await expect(page.getByTestId('password-error')).toHaveText(
      'This field is required',
    );
  });

  test('should show error for invalid email format', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');

    const error = page.getByTestId('email-error');
    await expect(error).toBeVisible();
    await expect(error).toHaveText('Invalid email address');
  });

  test('should show error for non-existent user', async ({ page }) => {
    await page.fill('input[name="email"]', 'nonexistent@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    const error = page
      .getByTestId('error-message-root')
      .or(page.locator('p:has-text("Invalid email or password")'));
    await expect(error).toBeVisible({ timeout: 10000 });
    await expect(error).toHaveText('Invalid email or password');
  });
});

test.describe('Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/sign-up');
    await page.waitForLoadState('networkidle');
    // Give hydration time to finish
    await expect(
      page.getByRole('form', { name: 'sign-up-form' }),
    ).toBeVisible();
    if (test.info().project.name === 'webkit') {
      await page.waitForTimeout(1000);
    }
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.getByTestId('email-error')).toHaveText(
      'This field is required',
    );
    await expect(page.getByTestId('password-error')).toHaveText(
      'This field is required',
    );
    await expect(page.getByTestId('confirm-password-error')).toHaveText(
      'This field is required',
    );
  });

  test('should show error if passwords do not match', async ({ page }) => {
    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'mismatch');
    await page.click('button[type="submit"]');

    const error = page.getByTestId('confirm-password-error');
    await expect(error).toBeVisible();
    await expect(error).toHaveText('Passwords do not match');
  });
});
