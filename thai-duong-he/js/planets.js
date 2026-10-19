/* Dữ liệu Mặt Trời và 8 hành tinh.
   r, d: kích thước và khoảng cách để VẼ (không đúng tỉ lệ thật, để bé nhìn thấy được).
   size: đường kính thật so với Trái Đất. */
const SUN = {
  id: 'sun', vi: 'Mặt Trời', en: 'Sun', r: 5, size: 109, color: '#FFC13B',
  lead: 'Mặt Trời là một ngôi sao khổng lồ. Nó cho chúng ta ánh sáng và hơi ấm mỗi ngày.',
  dist: 'Ở chính giữa', year: 'Các hành tinh đi vòng quanh nó', day: 'Khoảng 25 ngày Trái Đất',
  temp: '5.500°C ở bề mặt', moons: 'Không có', sizeText: '109 lần Trái Đất',
  tex: { type: 'rocky', pal: ['#ff8a00', '#ffb320', '#fff08a'], scale: 2.4, seed: 3 },
  facts: [
    'Mặt Trời to đến mức chứa được hơn 1 triệu Trái Đất.',
    'Ánh sáng từ Mặt Trời bay đến Trái Đất mất khoảng 8 phút.',
    'Không bao giờ được nhìn thẳng vào Mặt Trời nhé, mắt sẽ bị đau!'
  ],
  quiz: { q: 'Mặt Trời là gì?', opts: ['Một ngôi sao', 'Một hành tinh', 'Một vệ tinh'], a: 0 }
};

const PLANETS = [
  {
    id: 'mercury', vi: 'Sao Thủy', en: 'Mercury', r: 0.55, d: 10, period: 88, tilt: 0, spin: 0.15, size: 0.38, color: '#B8AFA6',
    lead: 'Hành tinh bé nhất và gần Mặt Trời nhất. Bề mặt đầy hố tròn như mặt trăng.',
    dist: '58 triệu km', year: '88 ngày Trái Đất', day: '59 ngày Trái Đất', temp: '-180°C đến 430°C', moons: 'Không có', sizeText: '0,4 lần Trái Đất',
    tex: { type: 'rocky', pal: ['#6f6a66', '#a39b94', '#d3ccc4'], scale: 3, seed: 11, craters: true },
    facts: [
      'Một năm trên Sao Thủy chỉ dài 88 ngày, ngắn nhất trong các hành tinh.',
      'Ban ngày nóng như lò nướng, ban đêm lạnh như tủ đông.',
      'Sao Thủy không có vệ tinh nào quay quanh.'
    ],
    quiz: { q: 'Hành tinh nào gần Mặt Trời nhất?', opts: ['Sao Thủy', 'Sao Hỏa', 'Sao Thổ'], a: 0 }
  },
  {
    id: 'venus', vi: 'Sao Kim', en: 'Venus', r: 0.95, d: 14.5, period: 225, tilt: 177, spin: 0.05, size: 0.95, color: '#E8C27A',
    lead: 'Sao Kim được bao bọc bởi mây dày màu vàng. Đây là hành tinh nóng nhất.',
    dist: '108 triệu km', year: '225 ngày Trái Đất', day: '243 ngày Trái Đất', temp: '465°C', moons: 'Không có', sizeText: '0,95 lần Trái Đất',
    tex: { type: 'swirl', pal: ['#b0793a', '#e6bd78', '#fff0c4'], scale: 1.6, seed: 23 },
    facts: [
      'Sao Kim nóng hơn cả Sao Thủy dù xa Mặt Trời hơn.',
      'Sao Kim quay ngược chiều với hầu hết hành tinh khác.',
      'Trên bầu trời, Sao Kim là "ngôi sao" sáng nhất lúc hoàng hôn.'
    ],
    quiz: { q: 'Hành tinh nào nóng nhất?', opts: ['Sao Kim', 'Sao Hải Vương', 'Trái Đất'], a: 0 }
  },
  {
    id: 'earth', vi: 'Trái Đất', en: 'Earth', r: 1, d: 19, period: 365, tilt: 23, spin: 0.5, size: 1, color: '#4DA3FF',
    lead: 'Ngôi nhà của chúng ta! Đây là nơi duy nhất mà chúng ta biết có sự sống.',
    dist: '150 triệu km', year: '365 ngày', day: '24 giờ', temp: 'Trung bình 15°C', moons: '1 (Mặt Trăng)', sizeText: 'Chính là 1',
    tex: { type: 'earth', scale: 1.5, seed: 5 },
    facts: [
      'Hơn một nửa bề mặt Trái Đất là biển và đại dương.',
      'Mặt Trăng là người bạn duy nhất của Trái Đất, quay quanh Trái Đất mỗi tháng.',
      'Trái Đất có không khí và nước nên cây cối, động vật và con người sống được.'
    ],
    quiz: { q: 'Chúng ta đang sống trên hành tinh nào?', opts: ['Sao Hỏa', 'Trái Đất', 'Sao Mộc'], a: 1 }
  },
  {
    id: 'mars', vi: 'Sao Hỏa', en: 'Mars', r: 0.72, d: 24, period: 687, tilt: 25, spin: 0.48, size: 0.53, color: '#E0643C',
    lead: 'Hành tinh đỏ! Màu đỏ đến từ đất đá chứa sắt bị gỉ.',
    dist: '228 triệu km', year: '687 ngày Trái Đất', day: 'Hơn 24 giờ', temp: 'Trung bình -63°C', moons: '2', sizeText: '0,5 lần Trái Đất',
    tex: { type: 'rocky', pal: ['#7a2f19', '#c25a36', '#e8a070'], scale: 2.6, seed: 31, cap: true },
    facts: [
      'Sao Hỏa có ngọn núi cao nhất hệ Mặt Trời, cao gấp hơn 2 lần đỉnh Everest.',
      'Các nhà khoa học đã gửi xe tự hành đến Sao Hỏa để khám phá.',
      'Sao Hỏa có 2 vệ tinh nhỏ, hình củ khoai tây.'
    ],
    quiz: { q: 'Hành tinh nào được gọi là hành tinh đỏ?', opts: ['Sao Thiên Vương', 'Sao Kim', 'Sao Hỏa'], a: 2 }
  },
  {
    id: 'jupiter', vi: 'Sao Mộc', en: 'Jupiter', r: 2.9, d: 36, period: 4333, tilt: 3, spin: 1.1, size: 11.2, color: '#D9A066',
    lead: 'Ông vua của các hành tinh! To nhất hệ Mặt Trời, được làm từ khí.',
    dist: '778 triệu km', year: '12 năm Trái Đất', day: 'Gần 10 giờ', temp: '-110°C', moons: 'Hơn 90', sizeText: '11 lần Trái Đất',
    tex: { type: 'gas', pal: ['#8d5a34', '#c98f5a', '#ecd2a8', '#f6ead4'], bands: 9, seed: 41, spot: true },
    facts: [
      'Sao Mộc to đến mức chứa được hơn 1.300 Trái Đất.',
      'Vết đỏ lớn trên Sao Mộc là một cơn bão khổng lồ, kéo dài hàng trăm năm.',
      'Ngày trên Sao Mộc rất ngắn, chỉ gần 10 giờ.'
    ],
    quiz: { q: 'Hành tinh nào to nhất?', opts: ['Trái Đất', 'Sao Mộc', 'Sao Thủy'], a: 1 }
  },
  {
    id: 'saturn', vi: 'Sao Thổ', en: 'Saturn', r: 2.4, d: 50, period: 10759, tilt: 27, spin: 1.0, size: 9.45, color: '#E8D08A',
    lead: 'Hành tinh có chiếc vành đai tuyệt đẹp, làm từ băng và đá.',
    dist: '1.433 triệu km', year: '29 năm Trái Đất', day: 'Hơn 10 giờ', temp: '-140°C', moons: 'Hơn 140', sizeText: '9 lần Trái Đất',
    tex: { type: 'gas', pal: ['#b79a5c', '#dcc487', '#f3e3b5', '#fbf1d3'], bands: 7, seed: 53 },
    ring: true,
    facts: [
      'Vành đai Sao Thổ được tạo từ vô số mảnh băng và đá, có mảnh to bằng cái nhà.',
      'Sao Thổ nhẹ đến nỗi nếu có bể nước đủ lớn, nó sẽ nổi lên!',
      'Sao Thổ có hơn 140 vệ tinh.'
    ],
    quiz: { q: 'Hành tinh nào có vành đai nổi tiếng nhất?', opts: ['Sao Thổ', 'Sao Hỏa', 'Sao Kim'], a: 0 }
  },
  {
    id: 'uranus', vi: 'Sao Thiên Vương', en: 'Uranus', r: 1.7, d: 62, period: 30687, tilt: 98, spin: 0.7, size: 4, color: '#8FE3E8',
    lead: 'Hành tinh băng màu xanh ngọc, đang "nằm lăn" khi quay quanh Mặt Trời.',
    dist: '2.872 triệu km', year: '84 năm Trái Đất', day: 'Khoảng 17 giờ', temp: '-195°C', moons: '28', sizeText: '4 lần Trái Đất',
    tex: { type: 'gas', pal: ['#79d3da', '#9be6ea', '#b8f1f2'], bands: 3, seed: 61, soft: true },
    facts: [
      'Sao Thiên Vương nằm nghiêng gần như nằm ngang, như quả bóng đang lăn.',
      'Màu xanh ngọc đến từ khí mê-tan trong bầu khí quyển.',
      'Một năm ở đây dài bằng 84 năm trên Trái Đất.'
    ],
    quiz: { q: 'Hành tinh nào quay quanh Mặt Trời trong tư thế "nằm lăn"?', opts: ['Sao Thiên Vương', 'Sao Mộc', 'Trái Đất'], a: 0 }
  },
  {
    id: 'neptune', vi: 'Sao Hải Vương', en: 'Neptune', r: 1.65, d: 73, period: 60190, tilt: 28, spin: 0.75, size: 3.9, color: '#4F6FE8',
    lead: 'Hành tinh xa nhất, xanh thẫm, lạnh giá và có những cơn gió rất mạnh.',
    dist: '4.495 triệu km', year: '165 năm Trái Đất', day: 'Khoảng 16 giờ', temp: '-200°C', moons: '16', sizeText: '4 lần Trái Đất',
    tex: { type: 'gas', pal: ['#2a43b8', '#3f62e0', '#6f90f5'], bands: 5, seed: 71, soft: true },
    facts: [
      'Gió trên Sao Hải Vương thổi nhanh hơn cả máy bay phản lực.',
      'Sao Hải Vương xa đến mức mới đi được một vòng quanh Mặt Trời kể từ khi được phát hiện.',
      'Ánh sáng Mặt Trời ở đó yếu như lúc chạng vạng.'
    ],
    quiz: { q: 'Hành tinh nào xa Mặt Trời nhất?', opts: ['Sao Thủy', 'Sao Hải Vương', 'Sao Hỏa'], a: 1 }
  }
];
