/* DANH SÁCH ĐỀ TÀI
   Thêm đề tài mới: tạo thư mục mới (có index.html bên trong), rồi thêm một mục vào mảng dưới đây.
   - title: tên đề tài          - desc: một câu mô tả
   - href: đường dẫn tới trang chính của đề tài
   - age: gợi ý độ tuổi         - bg / ink: màu nền và màu chữ của thẻ
   - art: hình minh hoạ (SVG, viewBox 0 0 240 150)                                        */
const TOPICS = [
  {
    title: 'Du hành Hệ Mặt Trời',
    desc: 'Bay từ Trái Đất ra vũ trụ và gặp 8 hành tinh.',
    href: 'thai-duong-he/index.html',
    age: 'Từ 4 tuổi',
    bg: '#1c1a5e',
    ink: '#fff4da',
    art: `<svg viewBox="0 0 240 150" aria-hidden="true">
      <g fill="#fff4da">
        <circle cx="22" cy="24" r="1.8"/><circle cx="70" cy="14" r="1.2"/><circle cx="118" cy="30" r="1.6"/>
        <circle cx="176" cy="16" r="1.4"/><circle cx="214" cy="40" r="1.8"/><circle cx="40" cy="118" r="1.4"/>
        <circle cx="206" cy="128" r="1.2"/><circle cx="150" cy="134" r="1.6"/>
      </g>
      <circle cx="46" cy="76" r="15" fill="#4da3ff"/><path d="M36 70c6-6 12-3 14 3s-6 8-10 6-6-5-4-9z" fill="#3f9b4a"/>
      <circle cx="198" cy="52" r="9" fill="#e0643c"/>
      <g transform="rotate(-18 128 76)">
        <ellipse cx="128" cy="76" rx="62" ry="15" fill="none" stroke="#e8d08a" stroke-width="7" opacity=".9"/>
        <circle cx="128" cy="76" r="34" fill="#e8d08a"/>
        <path d="M95 68h66M94 80h68" stroke="#b79a5c" stroke-width="5" opacity=".6"/>
        <path d="M66 80a62 15 0 0 0 124 0" fill="none" stroke="#e8d08a" stroke-width="7"/>
      </g>
    </svg>`
  },
  {
    title: 'Khám phá rừng Amazon',
    desc: 'Gặp báo đốm, lười, cá heo hồng và các bạn cây trong khu rừng lớn nhất thế giới.',
    href: 'kham-pha-amazon/index.html',
    age: 'Từ 4 tuổi',
    bg: '#1f7a3d',
    ink: '#fff4da',
    art: `<svg viewBox="0 0 240 150" aria-hidden="true">
      <circle cx="196" cy="34" r="16" fill="#ffc13b"/>
      <path d="M-4 150C0 80 60 40 120 50 110 110 60 150 -4 150z" fill="#2a8446"/>
      <path d="M244 150c-4-70-56-106-110-98 6 56 52 98 110 98z" fill="#58c26b"/>
      <circle cx="120" cy="96" r="34" fill="#f2b233"/>
      <circle cx="94" cy="68" r="12" fill="#f2b233"/><circle cx="146" cy="68" r="12" fill="#f2b233"/>
      <ellipse cx="120" cy="108" rx="16" ry="12" fill="#fff4da"/>
      <circle cx="108" cy="90" r="6" fill="#fff"/><circle cx="132" cy="90" r="6" fill="#fff"/>
      <circle cx="108" cy="91" r="3" fill="#12331f"/><circle cx="132" cy="91" r="3" fill="#12331f"/>
      <path d="M114 100h12l-6 6z" fill="#ff8fb1"/>
    </svg>`
  }
];
