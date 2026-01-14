# 📋 To-Do List Automated Testing Suite

โปรเจค Automated Testing สำหรับเว็บไซต์ To-Do List ใช้ **Playwright** ในการทดสอบ

🔗 **Target Website:** [https://abhigyank.github.io/To-Do-List/](https://abhigyank.github.io/To-Do-List/)

---

## 📦 การติดตั้ง (Installation)

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. ติดตั้ง Playwright Browsers

```bash
npx playwright install
```

---

## 🚀 วิธีการรันทดสอบ (Running Tests)

### รันทดสอบทั้งหมด

```bash
npm test
```

### รันทดสอบแบบเห็น Browser (Headed Mode)

```bash
npm run test:headed
```

### รันทดสอบด้วย UI Mode (Interactive)

```bash
npm run test:ui
```

### รันทดสอบแบบ Debug

```bash
npm run test:debug
```

---

## 🌐 รันทดสอบแยกตาม Browser

| Command | Description |
|---------|-------------|
| `npm run test:chrome` | ทดสอบบน Chromium |
| `npm run test:firefox` | ทดสอบบน Firefox |
| `npm run test:webkit` | ทดสอบบน WebKit (Safari) |
| `npm run test:mobile` | ทดสอบบน Mobile (Chrome & Safari) |

---

## 📂 รันทดสอบแยกตามหมวดหมู่

| Command | Description |
|---------|-------------|
| `npm run test:navigation` | ทดสอบการนำทาง |
| `npm run test:add-item` | ทดสอบการเพิ่มรายการ |
| `npm run test:complete` | ทดสอบการทำเครื่องหมายเสร็จ |
| `npm run test:delete` | ทดสอบการลบรายการ |
| `npm run test:edge-cases` | ทดสอบกรณีพิเศษ |

---

## 📊 ดูรายงานผลการทดสอบ (Test Report)

```bash
npm run test:report
```

รายงานจะเปิดใน browser โดยอัตโนมัติ

---

## 🛠️ เครื่องมือสร้าง Test (Code Generator)

ใช้ Playwright Codegen เพื่อสร้าง test script โดยการคลิก:

```bash
npm run test:codegen
```

---

## 📋 Test Cases (49 Tests)

### 1. 🧭 Navigation Tests (การนำทาง)
| Test ID | Description |
|---------|-------------|
| TC001 | ทดสอบการนำทางไป Add Item tab |
| TC002 | ทดสอบการนำทางไป To-Do Tasks tab |
| TC003 | ทดสอบการนำทางไป Completed tab |
| TC004 | ทดสอบ title ของหน้าเว็บ |
| TC005 | ทดสอบ tabs แสดงและคลิกได้ |
| TC006 | ทดสอบการเข้าถึงผ่าน URL โดยตรง |

### 2. ➕ Add Item Tests (เพิ่มรายการ)
| Test ID | Description |
|---------|-------------|
| TC007 | ทดสอบ input field และปุ่ม add แสดง |
| TC008 | ทดสอบ input field รับข้อความได้ |
| TC009 | ทดสอบเพิ่มรายการด้วย text ปกติ |
| TC010 | ทดสอบ input field ว่างหลังเพิ่มรายการ |
| TC011 | ทดสอบเพิ่มหลายรายการติดกัน |
| TC012 | ทดสอบเพิ่มรายการที่มีอักขระพิเศษ |
| TC013 | ทดสอบเพิ่มรายการภาษาไทย |
| TC014 | ทดสอบเพิ่มรายการที่มีข้อความยาวมาก |
| TC015 | ทดสอบเพิ่มรายการที่เป็นตัวเลขเท่านั้น |
| TC016 | ทดสอบเพิ่มรายการที่มี emoji |

### 3. ✅ Complete Item Tests (ทำเครื่องหมายเสร็จ)
| Test ID | Description |
|---------|-------------|
| TC017 | ทดสอบ mark รายการเป็น completed |
| TC018 | ทดสอบ completed item มี strikethrough |
| TC019 | ทดสอบ checkbox หายไปหลัง mark complete |
| TC020 | ทดสอบ complete หลายรายการ |
| TC021 | ทดสอบ completed item แสดงตาม order ที่ถูกต้อง |

### 4. 🗑️ Delete Item Tests (ลบรายการ)
| Test ID | Description |
|---------|-------------|
| TC022 | ทดสอบลบรายการที่ยังไม่ complete |
| TC023 | ทดสอบลบรายการที่ complete แล้ว |
| TC024 | ทดสอบลบหลายรายการ |
| TC025 | ทดสอบปุ่ม Delete แสดงในแต่ละรายการ |
| TC026 | ทดสอบลบรายการอย่างรวดเร็ว |

### 5. 🎨 UI/UX Tests (ส่วนติดต่อผู้ใช้)
| Test ID | Description |
|---------|-------------|
| TC027 | ทดสอบ heading "TO DO LIST" แสดง |
| TC028 | ทดสอบปุ่ม Add แสดง |
| TC029 | ทดสอบ input field แสดงและ enabled |
| TC030 | ทดสอบ items แสดงเป็น list |
| TC031 | ทดสอบ checkbox คลิกได้ |
| TC032 | ทดสอบ responsive design |

### 6. 💾 Data Persistence Tests (การเก็บข้อมูล)
| Test ID | Description |
|---------|-------------|
| TC033 | ทดสอบข้อมูลยังอยู่หลัง refresh |
| TC034 | ทดสอบ completed status หลัง refresh |

### 7. ⚠️ Edge Cases (กรณีพิเศษ)
| Test ID | Description |
|---------|-------------|
| TC035 | ทดสอบ input ว่าง |
| TC036 | ทดสอบ input ที่มีแต่ whitespace |
| TC037 | ทดสอบเพิ่มรายการซ้ำ |
| TC038 | ทดสอบเพิ่มรายการอย่างรวดเร็ว |

### 8. 🔄 Integration Tests (การทำงานร่วมกัน)
| Test ID | Description |
|---------|-------------|
| TC039 | Full workflow: Add → Complete → Delete |
| TC040 | Full workflow: Add → Delete |

### 9. ♿ Accessibility Tests (การเข้าถึง)
| Test ID | Description |
|---------|-------------|
| TC041 | ทดสอบ input focusable |
| TC042 | ทดสอบเพิ่มรายการด้วย keyboard |

### 10. ⚡ Performance Tests (ประสิทธิภาพ)
| Test ID | Description |
|---------|-------------|
| TC043 | ทดสอบ page load time |
| TC044 | ทดสอบ add item responsiveness |

### 11. 🔍 Specific Locator Tests (ทดสอบ Locators)
| Test ID | Description |
|---------|-------------|
| TC045 | ทดสอบ #new-task input exists |
| TC046 | ทดสอบ #add-item > button exists |
| TC047 | ทดสอบ checkbox exists in list |
| TC048 | ทดสอบ completed item span structure |
| TC049 | ทดสอบ delete button has correct class |

---

## 🔧 Locators Reference

```typescript
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
```

---

## 📁 โครงสร้างโปรเจค

```
bluepiProject/
├── tests/
│   └── todo-list.spec.ts    # ไฟล์ test cases ทั้งหมด
├── playwright.config.ts      # การตั้งค่า Playwright
├── package.json             # Dependencies และ Scripts
├── README.md                # เอกสารนี้
├── playwright-report/       # รายงานผลการทดสอบ (auto-generated)
└── test-results/            # ผลลัพธ์การทดสอบ (auto-generated)
```

---

## 🔧 การตั้งค่า Playwright (Configuration)

ไฟล์ `playwright.config.ts` มีการตั้งค่าดังนี้:

- **Base URL:** `https://abhigyank.github.io/To-Do-List/`
- **Browsers:** Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Timeout:** 60 วินาทีต่อ test
- **Retries:** 2 ครั้งบน CI
- **Screenshots:** บันทึกเมื่อ test fail
- **Video:** บันทึกเมื่อ test fail
- **Trace:** บันทึกเมื่อ retry

---

## 📝 ตัวอย่างการใช้งาน

### รันเฉพาะบาง Test

```bash
# รันเฉพาะ test ที่มีชื่อ "TC001"
npx playwright test -g "TC001"

# รันเฉพาะไฟล์
npx playwright test tests/todo-list.spec.ts
```

### รันแบบ Parallel

```bash
npx playwright test --workers=4
```

### รันพร้อม Trace

```bash
npx playwright test --trace on
```

---

## 🐛 การแก้ปัญหา (Troubleshooting)

### ปัญหา: Browser ไม่ถูกติดตั้ง

```bash
npx playwright install
```

### ปัญหา: Test timeout

เพิ่ม timeout ใน command:

```bash
npx playwright test --timeout=120000
```

### ปัญหา: Network issues

ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต เนื่องจากทดสอบกับเว็บไซต์จริง

---

## 📈 CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## 🎯 สรุปฟีเจอร์ที่ทดสอบ

| Feature | Coverage |
|---------|----------|
| Navigation | ✅ ครบถ้วน |
| Add Item | ✅ ครบถ้วน |
| Complete Item | ✅ ครบถ้วน |
| Delete Item | ✅ ครบถ้วน |
| Data Persistence | ✅ ครบถ้วน |
| Edge Cases | ✅ ครบถ้วน |
| Accessibility | ✅ พื้นฐาน |
| Performance | ✅ พื้นฐาน |
| Responsive | ✅ ครบถ้วน |

---

## 📞 ติดต่อ

หากมีคำถามหรือต้องการความช่วยเหลือ สามารถเปิด Issue ได้

---

**Kritsakorn Buikwang! 🎉**
# todo-list-playwright-tests
