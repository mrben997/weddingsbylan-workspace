# Flex Utilities System - SCSS Documentation

## 📋 Tổng Quan

Hệ thống Flex Utilities được thiết kế để cung cấp một bộ class CSS hoàn chỉnh và linh hoạt cho việc sử dụng Flexbox layout trong dự án Next.js. Thay vì viết CSS riêng lẻ, bạn có thể sử dụng các utility classes để tạo layout nhanh chóng và nhất quán.

## 🏗️ Cấu Trúc Hệ Thống

### 1. Flex Direction Classes
Điều khiển hướng của flex container:

```scss
.flex-row           // flex-direction: row
.flex-col           // flex-direction: column  
.flex-row-reverse   // flex-direction: row-reverse
.flex-col-reverse   // flex-direction: column-reverse
```

### 2. Align Items Classes
Căn chỉnh items theo trục chéo (cross axis):

```scss
.items-start        // align-items: flex-start
.items-center       // align-items: center
.items-end          // align-items: flex-end
.items-stretch      // align-items: stretch
.items-baseline     // align-items: baseline
```

### 3. Justify Content Classes
Căn chỉnh items theo trục chính (main axis):

```scss
.justify-start      // justify-content: flex-start
.justify-center     // justify-content: center
.justify-end        // justify-content: flex-end
.justify-between    // justify-content: space-between
.justify-around     // justify-content: space-around
.justify-evenly     // justify-content: space-evenly
```

### 4. Flex Properties
Các thuộc tính flex cơ bản:

```scss
.flex-wrap          // flex-wrap: wrap
.flex-nowrap        // flex-wrap: nowrap
.flex-grow          // flex-grow: 1
.flex-shrink        // flex-shrink: 1
.flex-none          // flex: none
.flex-auto          // flex: 1 1 auto
```

### 5. Numbered Flex Classes
Điều chỉnh tỷ lệ flex từ 1-12:

```scss
.flex-1             // flex: 1
.flex-2             // flex: 2
...
.flex-12            // flex: 12
```

## 🚀 Shortcut Classes (Recommended)

Để tăng tốc độ phát triển, chúng tôi cung cấp các class kết hợp phổ biến:

### Horizontal Layouts
```scss
.flex-center           // display: flex; align-items: center; justify-content: center;
.flex-center-between   // display: flex; align-items: center; justify-content: space-between;
.flex-center-start     // display: flex; align-items: center; justify-content: flex-start;
.flex-center-end       // display: flex; align-items: center; justify-content: flex-end;
```

### Vertical Layouts
```scss
.flex-col-center       // display: flex; flex-direction: column; align-items: center; justify-content: center;
.flex-col-start        // display: flex; flex-direction: column; align-items: flex-start;
.flex-col-end          // display: flex; flex-direction: column; align-items: flex-end;
```

### Text Alignment
```scss
.text-left             // text-align: left
.text-center           // text-align: center
.text-right            // text-align: right
.text-justify          // text-align: justify
```

## 💡 Ví Dụ Sử Dụng

### 1. Header Navigation
```tsx
// Trước đây
<header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  
// Hiện tại
<header className="flex-center-between">
  <div className="logo">Logo</div>
  <nav className="flex-center">
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
```

### 2. Card Layout
```tsx
// Trước đây
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

// Hiện tại  
<div className="flex-col-center">
  <img src="..." alt="..." />
  <h3 className="text-center">Title</h3>
  <p>Description</p>
</div>
```

### 3. Grid System
```tsx
<div className="flex-row flex-wrap">
  <div className="flex-1">Column 1</div>
  <div className="flex-2">Column 2 (wider)</div>
  <div className="flex-1">Column 3</div>
</div>
```

### 4. Form Layout
```tsx
<form className="flex-col">
  <div className="flex-center-between">
    <label>Name:</label>
    <input type="text" className="flex-1" />
  </div>
  
  <div className="flex-center justify-end">
    <button className="app-btn">Cancel</button>
    <button className="app-btn app-btn-primary">Submit</button>
  </div>
</form>
```

## 🎯 Best Practices

### 1. Sử dụng Shortcut Classes trước
```tsx
// ✅ Tốt
<div className="flex-center">

// ❌ Dài dòng  
<div className="flex-row items-center justify-center">
```

### 2. Kết hợp linh hoạt
```tsx
// ✅ Linh hoạt
<div className="flex-col-center flex-wrap">
  
// ✅ Responsive
<div className="flex-col md:flex-row items-center">
```

### 3. Responsive Design
```tsx
// Mobile: stack vertically, Desktop: horizontal
<div className="flex-col lg:flex-center-between">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

## 🔧 Customization

### Thêm Direction mới
```scss
$flex-directions: (
  'row': row,
  'col': column,
  'row-reverse': row-reverse,
  'col-reverse': column-reverse,
  // Thêm mới
  'custom': your-value
);
```

### Thêm Justify Content mới
```scss
$justify-content: (
  'start': flex-start,
  'center': center,
  'end': flex-end,
  'between': space-between,
  'around': space-around,
  'evenly': space-evenly,
  // Thêm mới
  'custom': your-value
);
```

### Tạo Shortcut mới
```scss
.your-custom-flex {
  display: flex;
  // Your custom combination
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}
```

## 📊 So Sánh Trước/Sau

| Trước (Inline Styles) | Sau (Utility Classes) |
|----------------------|----------------------|
| `style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}` | `className="flex-center"` |
| `style={{ display: 'flex', flexDirection: 'column' }}` | `className="flex-col"` |
| `style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}` | `className="flex-center-between"` |

## 🎨 Code Size Reduction

- **Trước**: ~150 dòng CSS riêng lẻ
- **Sau**: ~50 dòng SCSS với loops và maps
- **Giảm**: ~70% code size
- **Tăng**: Maintainability và reusability

## 🔄 Migration Guide

### Bước 1: Thay thế Inline Styles
```tsx
// Tìm
style={{ display: 'flex', alignItems: 'center' }}

// Thay bằng  
className="flex-row items-center"
```

### Bước 2: Sử dụng Shortcuts
```tsx
// Tìm
className="flex-row items-center justify-center"

// Thay bằng
className="flex-center"
```

### Bước 3: Optimize với Responsive
```tsx
// Thêm responsive classes
className="flex-col md:flex-center-between"
```

## 📚 Resources

- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Tailwind CSS Flexbox](https://tailwindcss.com/docs/flex)
- [MDN Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

---

**Tác giả**: Development Team  
**Cập nhật**: Tháng 12, 2024  
**Version**: 1.0.0
