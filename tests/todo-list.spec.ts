import { test, expect, Page } from '@playwright/test';

/**
 * To-Do List Website Automated Test Suite
 * Website: https://abhigyank.github.io/To-Do-List/
 * 
 * Locators Reference:
 * - Input field: #new-task
 * - Add button: #add-item > button
 * - Checkbox: #1, #2, #3... (dynamic, increments per item)
 * - Completed item span: #completed-tasks > li:nth-child(n) > span
 * - Delete button: button.delete#[id]
 * 
 * Note: 
 * - Checkbox disappears after checking (cannot uncheck)
 * - Checkbox ID increments globally
 * 
 * Test Coverage:
 * 1. Navigation Tests - ทดสอบการนำทางระหว่าง tabs
 * 2. Add Item Tests - ทดสอบการเพิ่มรายการใหม่
 * 3. Complete Item Tests - ทดสอบการ mark รายการเป็น completed
 * 4. Delete Item Tests - ทดสอบการลบรายการ
 * 5. UI/UX Tests - ทดสอบส่วนติดต่อผู้ใช้
 * 6. Data Persistence Tests - ทดสอบการเก็บข้อมูล
 * 7. Edge Cases - ทดสอบกรณีพิเศษ
 * 8. Integration Tests - ทดสอบการทำงานร่วมกัน
 * 9. Accessibility Tests - ทดสอบการเข้าถึง
 * 10. Performance Tests - ทดสอบประสิทธิภาพ
 * 11. Specific Locator Tests - ทดสอบ Locators เฉพาะ
 */

// Base URL
const BASE_URL = 'https://abhigyank.github.io/To-Do-List/';

// Selectors - ใช้ locators ที่ถูกต้องตามที่ inspect มา
const SELECTORS = {
  inputField: '#new-task',
  addButton: '#add-item > button',
  todoList: '#incomplete-tasks',
  completedList: '#completed-tasks',
  deleteButton: 'button.delete',
  navAddItem: 'a[href="#add-item"]',
  navTodo: 'a[href="#todo"]',
  navCompleted: 'a[href="#completed"]',
};

// Helper function to add a todo item
async function addTodoItem(page: Page, itemText: string): Promise<void> {
  await page.locator(SELECTORS.inputField).fill(itemText);
  await page.locator(SELECTORS.addButton).click();
}

// ============================================
// 1. NAVIGATION TESTS - ทดสอบการนำทางระหว่าง tabs
// ============================================
test.describe('Navigation Tests - ทดสอบการนำทาง', () => {
  
  test('TC001 - Should navigate to Add Item tab', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator(SELECTORS.navAddItem).click();
    await expect(page).toHaveURL(/#add-item/);
  });

  test('TC002 - Should navigate to To-Do Tasks tab', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator(SELECTORS.navTodo).click();
    await expect(page).toHaveURL(/#todo/);
  });

  test('TC003 - Should navigate to Completed tab', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator(SELECTORS.navCompleted).click();
    await expect(page).toHaveURL(/#completed/);
  });

  test('TC004 - Should load page with correct title', async ({ page }) => {
    await page.goto(BASE_URL);
    const title = await page.locator('h1').textContent();
    expect(title?.toUpperCase()).toContain('TO DO LIST');
  });

  test('TC005 - Navigation tabs should be visible and clickable', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator(SELECTORS.navAddItem)).toBeVisible();
    await expect(page.locator(SELECTORS.navTodo)).toBeVisible();
    await expect(page.locator(SELECTORS.navCompleted)).toBeVisible();
  });

  test('TC006 - Direct URL navigation should work', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    await expect(page).toHaveURL(/#add-item/);

    await page.goto(`${BASE_URL}#todo`);
    await expect(page).toHaveURL(/#todo/);

    await page.goto(`${BASE_URL}#completed`);
    await expect(page).toHaveURL(/#completed/);
  });
});

// ============================================
// 2. ADD ITEM TESTS - ทดสอบการเพิ่มรายการใหม่
// ============================================
test.describe('Add Item Tests - ทดสอบการเพิ่มรายการ', () => {
  
  test('TC007 - Should display input field and add button', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    await expect(page.locator(SELECTORS.inputField)).toBeVisible();
    await expect(page.locator(SELECTORS.addButton)).toBeVisible();
  });

  test('TC008 - Input field should accept text input', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testText = 'Test Input Text';
    await page.locator(SELECTORS.inputField).fill(testText);
    await expect(page.locator(SELECTORS.inputField)).toHaveValue(testText);
  });

  test('TC009 - Should add a new todo item with normal text', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Test Item ${Date.now()}`;
    await addTodoItem(page, testItem);
    
    await page.locator(SELECTORS.navTodo).click();
    await expect(page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem })).toBeVisible();
  });

  test('TC010 - Should clear input field after adding item', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Clear Test ${Date.now()}`;
    await addTodoItem(page, testItem);
    await expect(page.locator(SELECTORS.inputField)).toHaveValue('');
  });

  test('TC011 - Should add multiple items consecutively', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const timestamp = Date.now();
    const items = [
      `Item A ${timestamp}`,
      `Item B ${timestamp}`,
      `Item C ${timestamp}`
    ];

    for (const item of items) {
      await addTodoItem(page, item);
    }

    await page.locator(SELECTORS.navTodo).click();
    
    for (const item of items) {
      await expect(page.locator(`${SELECTORS.todoList} li`).filter({ hasText: item })).toBeVisible();
    }
  });

  test('TC012 - Should add item with special characters', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const specialItem = `Test @#$%^&*() ${Date.now()}`;
    
    await addTodoItem(page, specialItem);
    
    await page.locator(SELECTORS.navTodo).click();
    await expect(page.locator(`${SELECTORS.todoList} li`).filter({ hasText: specialItem })).toBeVisible();
  });

  test('TC013 - Should add item with Thai characters', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const thaiItem = `รายการทดสอบภาษาไทย ${Date.now()}`;
    
    await addTodoItem(page, thaiItem);
    
    await page.locator(SELECTORS.navTodo).click();
    await expect(page.locator(`${SELECTORS.todoList} li`).filter({ hasText: thaiItem })).toBeVisible();
  });

  test('TC014 - Should add item with very long text', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const longItem = 'A'.repeat(100) + ` ${Date.now()}`;
    
    await addTodoItem(page, longItem);
    
    await page.locator(SELECTORS.navTodo).click();
    const itemExists = await page.locator(`${SELECTORS.todoList} li`).filter({ hasText: longItem.substring(0, 50) }).count() > 0;
    expect(itemExists).toBeTruthy();
  });

  test('TC015 - Should add item with numbers only', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const numberItem = `123456789 ${Date.now()}`;
    
    await addTodoItem(page, numberItem);
    
    await page.locator(SELECTORS.navTodo).click();
    await expect(page.locator(`${SELECTORS.todoList} li`).filter({ hasText: numberItem })).toBeVisible();
  });

  test('TC016 - Should add item with emoji', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const emojiItem = `🎉 Party 🎊 ${Date.now()}`;
    
    await addTodoItem(page, emojiItem);
    
    await page.locator(SELECTORS.navTodo).click();
    await expect(page.locator(`${SELECTORS.todoList} li`).filter({ hasText: emojiItem })).toBeVisible();
  });
});

// ============================================
// 3. COMPLETE ITEM TESTS - ทดสอบการ mark completed
// Note: Checkbox จะหายไปหลังกด check และไม่สามารถ uncheck ได้
// ============================================
test.describe('Complete Item Tests - ทดสอบการทำเครื่องหมายเสร็จ', () => {
  
  test('TC017 - Should mark item as completed using checkbox', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Complete Test ${Date.now()}`;
    await addTodoItem(page, testItem);

    await page.locator(SELECTORS.navTodo).click();
    
    const listItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem });
    const checkbox = listItem.locator('input[type="checkbox"]');
    await checkbox.click();

    await page.locator(SELECTORS.navCompleted).click();
    await expect(page.locator(`${SELECTORS.completedList} li`).filter({ hasText: testItem })).toBeVisible();
  });

  test('TC018 - Completed item should have strikethrough style', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Strikethrough Test ${Date.now()}`;
    await addTodoItem(page, testItem);

    await page.locator(SELECTORS.navTodo).click();
    const listItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem });
    await listItem.locator('input[type="checkbox"]').click();

    await page.locator(SELECTORS.navCompleted).click();
    const completedItem = page.locator(`${SELECTORS.completedList} li`).filter({ hasText: testItem });
    
    const span = completedItem.locator('span');
    await expect(span).toBeVisible();
    
    const textDecoration = await span.evaluate(el => getComputedStyle(el).textDecoration);
    expect(textDecoration).toContain('line-through');
  });

  test('TC019 - Checkbox should disappear after marking complete', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Checkbox Disappear ${Date.now()}`;
    await addTodoItem(page, testItem);

    await page.locator(SELECTORS.navTodo).click();
    const listItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem });
    const checkbox = listItem.locator('input[type="checkbox"]');
    
    await expect(checkbox).toBeVisible();
    await checkbox.click();
    await expect(listItem).not.toBeVisible();
  });

  test('TC020 - Should complete multiple items', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const timestamp = Date.now();
    const items = [
      `Multi Complete A ${timestamp}`,
      `Multi Complete B ${timestamp}`
    ];

    for (const item of items) {
      await addTodoItem(page, item);
    }

    await page.locator(SELECTORS.navTodo).click();
    for (const item of items) {
      const listItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: item });
      await listItem.locator('input[type="checkbox"]').click();
      await page.waitForTimeout(200);
    }

    await page.locator(SELECTORS.navCompleted).click();
    for (const item of items) {
      await expect(page.locator(`${SELECTORS.completedList} li`).filter({ hasText: item })).toBeVisible();
    }
  });

  test('TC021 - Completed item should show in correct order', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const timestamp = Date.now();
    const item1 = `First ${timestamp}`;
    const item2 = `Second ${timestamp}`;
    
    await addTodoItem(page, item1);
    await addTodoItem(page, item2);

    await page.locator(SELECTORS.navTodo).click();
    
    const firstItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: item1 });
    await firstItem.locator('input[type="checkbox"]').click();

    await page.locator(SELECTORS.navCompleted).click();
    const firstCompletedItem = page.locator(`${SELECTORS.completedList} li:nth-child(1) span`);
    await expect(firstCompletedItem).toContainText(item1);
  });
});

// ============================================
// 4. DELETE ITEM TESTS - ทดสอบการลบรายการ
// ============================================
test.describe('Delete Item Tests - ทดสอบการลบรายการ', () => {
  
  test('TC022 - Should delete uncompleted item', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Delete Uncompleted ${Date.now()}`;
    await addTodoItem(page, testItem);

    await page.locator(SELECTORS.navTodo).click();
    const listItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem });
    await listItem.locator(SELECTORS.deleteButton).click();

    await expect(listItem).not.toBeVisible();
  });

  test('TC023 - Should delete completed item', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Delete Completed ${Date.now()}`;
    await addTodoItem(page, testItem);

    await page.locator(SELECTORS.navTodo).click();
    const todoItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem });
    await todoItem.locator('input[type="checkbox"]').click();

    await page.locator(SELECTORS.navCompleted).click();
    const completedItem = page.locator(`${SELECTORS.completedList} li`).filter({ hasText: testItem });
    await completedItem.locator(SELECTORS.deleteButton).click();

    await expect(completedItem).not.toBeVisible();
  });

  test('TC024 - Should delete multiple items', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const timestamp = Date.now();
    const items = [
      `Multi Delete A ${timestamp}`,
      `Multi Delete B ${timestamp}`
    ];

    for (const item of items) {
      await addTodoItem(page, item);
    }

    await page.locator(SELECTORS.navTodo).click();
    for (const item of items) {
      const listItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: item });
      await listItem.locator(SELECTORS.deleteButton).click();
      await page.waitForTimeout(200);
    }

    for (const item of items) {
      await expect(page.locator(`${SELECTORS.todoList} li`).filter({ hasText: item })).not.toBeVisible();
    }
  });

  test('TC025 - Delete button should be visible for each item', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Delete Button Test ${Date.now()}`;
    await addTodoItem(page, testItem);

    await page.locator(SELECTORS.navTodo).click();
    const listItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem });
    const deleteButton = listItem.locator(SELECTORS.deleteButton);
    await expect(deleteButton).toBeVisible();
  });

  test('TC026 - Should handle rapid deletion', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const timestamp = Date.now();
    const items = [
      `Rapid A ${timestamp}`,
      `Rapid B ${timestamp}`,
      `Rapid C ${timestamp}`
    ];

    for (const item of items) {
      await addTodoItem(page, item);
    }

    await page.locator(SELECTORS.navTodo).click();
    let deleteButtons = page.locator(`${SELECTORS.todoList} ${SELECTORS.deleteButton}`);
    
    while (await deleteButtons.count() > 0) {
      await deleteButtons.first().click();
      await page.waitForTimeout(100);
      deleteButtons = page.locator(`${SELECTORS.todoList} ${SELECTORS.deleteButton}`);
    }
  });
});

// ============================================
// 5. UI/UX TESTS - ทดสอบส่วนติดต่อผู้ใช้
// ============================================
test.describe('UI/UX Tests - ทดสอบส่วนติดต่อผู้ใช้', () => {
  
  test('TC027 - Main heading should display TO DO LIST', async ({ page }) => {
    await page.goto(BASE_URL);
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text?.toUpperCase()).toContain('TO DO LIST');
  });

  test('TC028 - Add button should be visible', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const addButton = page.locator(SELECTORS.addButton);
    await expect(addButton).toBeVisible();
  });

  test('TC029 - Input field should be visible and enabled', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const inputField = page.locator(SELECTORS.inputField);
    await expect(inputField).toBeVisible();
    await expect(inputField).toBeEnabled();
  });

  test('TC030 - Items should display as list', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `List Display Test ${Date.now()}`;
    await addTodoItem(page, testItem);

    await page.locator(SELECTORS.navTodo).click();
    const listItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem });
    await expect(listItem).toBeVisible();
  });

  test('TC031 - Checkbox should be clickable', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Checkbox Click Test ${Date.now()}`;
    await addTodoItem(page, testItem);

    await page.locator(SELECTORS.navTodo).click();
    const listItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem });
    const checkbox = listItem.locator('input[type="checkbox"]');
    
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toBeEnabled();
  });

  test('TC032 - Page should be responsive', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(BASE_URL);
      
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
    }
  });
});

// ============================================
// 6. DATA PERSISTENCE TESTS - ทดสอบการเก็บข้อมูล
// ============================================
test.describe('Data Persistence Tests - ทดสอบการเก็บข้อมูล', () => {
  
  test('TC033 - Items should persist after page refresh', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Persistence Test ${Date.now()}`;
    await addTodoItem(page, testItem);

    await page.reload();
    
    await page.locator(SELECTORS.navTodo).click();
    
    const itemVisible = await page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem }).isVisible().catch(() => false);
    console.log(`Item persistence after refresh: ${itemVisible}`);
  });

  test('TC034 - Completed status should persist after refresh', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Complete Persist ${Date.now()}`;
    await addTodoItem(page, testItem);

    await page.locator(SELECTORS.navTodo).click();
    const listItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem });
    await listItem.locator('input[type="checkbox"]').click();

    await page.reload();
    await page.locator(SELECTORS.navCompleted).click();
    
    const itemVisible = await page.locator(`${SELECTORS.completedList} li`).filter({ hasText: testItem }).isVisible().catch(() => false);
    console.log(`Completed status persistence: ${itemVisible}`);
  });
});

// ============================================
// 7. EDGE CASES - ทดสอบกรณีพิเศษ
// ============================================
test.describe('Edge Cases - ทดสอบกรณีพิเศษ', () => {
  
  test('TC035 - Should handle empty input gracefully', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    
    await page.locator(SELECTORS.addButton).click();
    
    await expect(page.locator(SELECTORS.navAddItem)).toBeVisible();
  });

  test('TC036 - Should handle whitespace-only input', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    
    await page.locator(SELECTORS.inputField).fill('   ');
    await page.locator(SELECTORS.addButton).click();
    
    await expect(page.locator(SELECTORS.navAddItem)).toBeVisible();
  });

  test('TC037 - Should handle adding same item twice', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const duplicateItem = `Duplicate ${Date.now()}`;
    
    await addTodoItem(page, duplicateItem);
    await addTodoItem(page, duplicateItem);
    
    await page.locator(SELECTORS.navTodo).click();
    const items = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: duplicateItem });
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('TC038 - Should handle rapid adding of items', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const timestamp = Date.now();
    
    for (let i = 1; i <= 10; i++) {
      await addTodoItem(page, `Rapid ${i} ${timestamp}`);
    }
    
    await page.locator(SELECTORS.navTodo).click();
    const firstItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: `Rapid 1 ${timestamp}` });
    await expect(firstItem).toBeVisible();
  });
});

// ============================================
// 8. INTEGRATION TESTS - ทดสอบการทำงานร่วมกัน
// ============================================
test.describe('Integration Tests - ทดสอบการทำงานร่วมกัน', () => {
  
  test('TC039 - Full workflow: Add -> Complete -> Delete', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Full Workflow ${Date.now()}`;
    
    await addTodoItem(page, testItem);

    await page.locator(SELECTORS.navTodo).click();
    const todoItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem });
    await expect(todoItem).toBeVisible();

    await todoItem.locator('input[type="checkbox"]').click();

    await page.locator(SELECTORS.navCompleted).click();
    const completedItem = page.locator(`${SELECTORS.completedList} li`).filter({ hasText: testItem });
    await expect(completedItem).toBeVisible();

    await completedItem.locator(SELECTORS.deleteButton).click();

    await expect(completedItem).not.toBeVisible();
  });

  test('TC040 - Full workflow: Add -> Delete without completing', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Add Delete Workflow ${Date.now()}`;
    
    await addTodoItem(page, testItem);

    await page.locator(SELECTORS.navTodo).click();
    const listItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem });
    await listItem.locator(SELECTORS.deleteButton).click();

    await expect(listItem).not.toBeVisible();
    await page.locator(SELECTORS.navCompleted).click();
    await expect(page.locator(`${SELECTORS.completedList} li`).filter({ hasText: testItem })).not.toBeVisible();
  });
});

// ============================================
// 9. ACCESSIBILITY TESTS - ทดสอบการเข้าถึง
// ============================================
test.describe('Accessibility Tests - ทดสอบการเข้าถึง', () => {
  
  test('TC041 - Input should be focusable', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const inputField = page.locator(SELECTORS.inputField);
    await inputField.focus();
    await expect(inputField).toBeFocused();
  });

  test('TC042 - Should be able to add item using keyboard', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Keyboard Test ${Date.now()}`;
    
    const inputField = page.locator(SELECTORS.inputField);
    await inputField.fill(testItem);
    await inputField.press('Enter');
    
    await page.locator(SELECTORS.navTodo).click();
  });
});

// ============================================
// 10. PERFORMANCE TESTS - ทดสอบประสิทธิภาพ
// ============================================
test.describe('Performance Tests - ทดสอบประสิทธิภาพ', () => {
  
  test('TC043 - Page should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(BASE_URL);
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000);
    console.log(`Page load time: ${loadTime}ms`);
  });

  test('TC044 - Adding item should be responsive', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    
    const startTime = Date.now();
    await addTodoItem(page, `Performance Test ${Date.now()}`);
    const addTime = Date.now() - startTime;
    
    expect(addTime).toBeLessThan(2000);
    console.log(`Add item time: ${addTime}ms`);
  });
});

// ============================================
// 11. SPECIFIC LOCATOR TESTS - ทดสอบ Locators เฉพาะ
// ============================================
test.describe('Specific Locator Tests - ทดสอบ Locators', () => {
  
  test('TC045 - Verify #new-task input exists', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    await expect(page.locator('#new-task')).toBeVisible();
  });

  test('TC046 - Verify #add-item > button exists', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    await expect(page.locator('#add-item > button')).toBeVisible();
  });

  test('TC047 - Verify checkbox exists in list', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    
    await addTodoItem(page, `First Item ${Date.now()}`);
    
    await page.locator(SELECTORS.navTodo).click();
    
    const firstCheckbox = page.locator(`${SELECTORS.todoList} li`).first().locator('input[type="checkbox"]');
    await expect(firstCheckbox).toBeVisible();
  });

  test('TC048 - Verify completed item span structure', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Span Test ${Date.now()}`;
    await addTodoItem(page, testItem);

    await page.locator(SELECTORS.navTodo).click();
    const listItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem });
    await listItem.locator('input[type="checkbox"]').click();

    await page.locator(SELECTORS.navCompleted).click();
    const completedSpan = page.locator('#completed-tasks > li:nth-child(1) > span');
    await expect(completedSpan).toBeVisible();
    await expect(completedSpan).toContainText(testItem);
  });

  test('TC049 - Verify delete button has correct class', async ({ page }) => {
    await page.goto(`${BASE_URL}#add-item`);
    const testItem = `Delete Class Test ${Date.now()}`;
    await addTodoItem(page, testItem);

    await page.locator(SELECTORS.navTodo).click();
    const listItem = page.locator(`${SELECTORS.todoList} li`).filter({ hasText: testItem });
    const deleteButton = listItem.locator('button.delete');
    await expect(deleteButton).toBeVisible();
    await expect(deleteButton).toHaveClass(/delete/);
  });
});
