import * as React from 'react'

type Item = { tag: string; attr: any }
type Data = { tag: string; attr: any; child?: Item[] | any }

function GenerateIcon(data: Data, props: any) {
  return React.createElement(
    data.tag,
    { ...data.attr, ...props },
    data.child.map((item: Item) =>
      React.createElement(item.tag, { ...item.attr, key: Math.random() }),
    ),
  )
}

export function Logo(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 100 100',
        width: props.size || 100,
        height: props.size || 100,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M24.1725 21.6912C26.2906 9.37231 37.0471 0 50 0C62.9528 0 73.7098 9.37268 75.8276 21.6912L77.7496 21.6912C82.0186 21.691 85.6821 21.6908 88.5844 22.0953C91.6834 22.5272 94.6689 23.5085 96.961 26.0629C99.253 28.6172 99.9011 31.6853 99.9892 34.8054C100.072 37.7273 99.667 41.3592 99.1953 45.5913L97.8399 57.7595C96.8468 66.6759 96.0539 73.794 94.7012 79.3516C93.3029 85.0961 91.1836 89.7424 87.1565 93.3377C83.1245 96.9375 78.2376 98.5227 72.3299 99.2733C66.609 100 59.377 100 50.3105 100H49.6895C40.623 100 33.391 100 27.67 99.2733C21.7624 98.5227 16.8755 96.9375 12.8435 93.3377C8.81638 89.7424 6.69709 85.0961 5.29881 79.3516C3.94606 73.794 3.15325 66.6761 2.16015 57.7598L0.804653 45.5913C0.332986 41.3591 -0.0717812 37.7273 0.010755 34.8054C0.0988883 31.6853 0.746961 28.6172 3.039 26.0629C5.33105 23.5085 8.31654 22.5272 11.4156 22.0953C14.3179 21.6908 17.9813 21.691 22.2503 21.6912C22.3539 21.6912 22.4577 21.6912 22.562 21.6912H24.1725ZM33.2938 21.6912H66.706C64.7399 14.325 58.0049 8.8968 50 8.8968C41.9952 8.8968 35.2598 14.3253 33.2938 21.6912ZM12.6499 30.9065C10.5651 31.197 9.98617 31.6607 9.68503 31.9963C9.3839 32.3319 8.98582 32.957 8.92653 35.0559C8.86364 37.2822 9.18826 40.2893 9.70383 44.9177L10.9905 56.4687C12.026 65.7643 12.7642 72.3136 13.9663 77.2524C15.1385 82.0683 16.6266 84.7753 18.792 86.7085C20.9523 88.6372 23.8267 89.8163 28.7971 90.4478C33.889 91.0948 40.5521 91.1032 50 91.1032C59.4478 91.1032 66.111 91.0948 71.2029 90.4478C76.1733 89.8163 79.0477 88.6372 81.208 86.7085C83.3733 84.7753 84.8615 82.0683 86.0337 77.2524C87.2358 72.3136 87.974 65.7643 89.0095 56.4687L90.2962 44.9177C90.8117 40.2893 91.1363 37.2822 91.0735 35.0559C91.0142 32.957 90.6161 32.3319 90.315 31.9963C90.0138 31.6607 89.4349 31.197 87.3501 30.9065C85.1389 30.5983 82.1067 30.588 77.438 30.588H22.562C17.8933 30.588 14.8611 30.5983 12.6499 30.9065Z',
            fill: 'currentColor',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M53.3595 44.3595C52.9367 44.7812 52.3043 44.9083 51.724 44.7327C49.4221 44.036 47.1554 43.944 44.9236 44.4568C42.3585 45.01 40.0407 46.3191 37.9703 48.3842C35.9 50.4494 34.5308 52.8179 33.8628 55.4897C33.1936 58.1038 33.3083 60.8208 34.2068 63.6408C35.1041 66.4029 36.765 68.9933 39.1896 71.4117C41.6142 73.8302 44.2111 75.487 46.9803 76.382C49.7778 77.2488 52.5017 77.3631 55.1519 76.7251C57.801 76.0293 60.1607 74.6489 62.2311 72.5837C65.1239 69.6982 66.6044 66.4223 66.6726 62.7561C66.7315 59.5864 65.7323 56.5243 63.6749 53.5697C63.146 52.81 62.0699 52.7478 61.4258 53.3903L51.8899 62.9022C51.2899 63.5006 50.3082 63.4916 49.6971 62.8821L48.628 61.8156C48.0169 61.2061 48.0078 60.2268 48.6078 59.6284L62.3883 45.8826C62.9883 45.2842 63.97 45.2932 64.5811 45.9028L66.5793 47.8959C68.8953 50.6587 70.4654 53.7525 71.2897 57.1773C72.0844 60.5727 72.0392 63.9506 71.154 67.3111C70.2392 70.642 68.4772 73.6088 65.868 76.2115C63.1169 78.9555 59.9417 80.7956 56.3422 81.7315C52.7132 82.638 49.0347 82.5615 45.3067 81.5021C41.607 80.4145 38.2492 78.3665 35.2333 75.3581C32.2173 72.3498 30.1641 69.0005 29.0737 65.3102C27.9821 61.5621 27.9054 57.8928 28.8438 54.3025C29.7525 50.6826 31.5824 47.5006 34.3334 44.7565C37.4815 41.6164 41.074 39.6551 45.111 38.8726C48.4751 38.2017 51.8384 38.4405 55.2009 39.5889C56.2341 39.9418 56.4878 41.239 55.7269 41.998L53.3595 44.3595Z',
            fill: 'currentColor',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M45.3901 46.5408L45.3759 46.5438C43.2583 47.0005 41.2983 48.0844 39.484 49.8941C37.6709 51.7025 36.5081 53.7335 35.9398 56.0064L35.9384 56.0122L35.9369 56.018C35.3767 58.2062 35.4574 60.5132 36.245 62.9883C37.0214 65.3748 38.4773 67.6815 40.7033 69.9019C42.9272 72.1202 45.2375 73.5718 47.6278 74.3468C50.0725 75.1021 52.3919 75.1889 54.6283 74.6546C56.8771 74.0599 58.9016 72.8851 60.7174 71.0739C63.2666 68.5311 64.4756 65.7659 64.5323 62.7165C64.5775 60.2841 63.8896 57.8786 62.369 55.4691L53.4035 64.412C51.9415 65.8704 49.6041 65.809 48.1834 64.3919L47.1143 63.3255C45.6936 61.9084 45.6321 59.5769 47.0941 58.1185L60.8747 44.3728C62.3367 42.9144 64.6741 42.9758 66.0947 44.3929L68.1603 46.4533L68.2215 46.5262C70.7444 49.5358 72.468 52.9263 73.3712 56.6789L73.3727 56.6854L73.3743 56.6919C74.248 60.4247 74.1985 64.1556 73.2243 67.8537L73.2215 67.8645L73.2185 67.8752C72.1991 71.5873 70.2358 74.8743 67.3816 77.7213C64.3743 80.721 60.8673 82.7615 56.8822 83.7977L56.8722 83.8003L56.8622 83.8028C52.8557 84.8035 48.7954 84.7137 44.7202 83.5557L44.7108 83.553L44.7015 83.5503C40.6234 82.3513 36.9612 80.1014 33.7196 76.868C30.478 73.6345 28.2223 69.9816 27.0204 65.9138L27.0192 65.9098L27.0181 65.9058C25.8256 61.8114 25.7317 57.7533 26.7697 53.7738C27.7774 49.7676 29.8086 46.2503 32.8198 43.2467C36.242 39.8331 40.2089 37.6488 44.6971 36.7777C48.4441 36.0315 52.1893 36.3034 55.8943 37.5688C58.5318 38.4697 59.0411 41.7119 57.2406 43.5078L54.8731 45.8693C53.8281 46.9117 52.3483 47.153 51.1024 46.7759C49.1396 46.1818 47.2529 46.1127 45.4042 46.5376L45.3901 46.5408ZM45.111 38.8726C41.074 39.6551 37.4815 41.6164 34.3334 44.7565C31.5824 47.5006 29.7525 50.6826 28.8438 54.3025C27.9054 57.8928 27.9821 61.5621 29.0737 65.3102C30.1641 69.0005 32.2173 72.3498 35.2333 75.3581C38.2492 78.3665 41.607 80.4145 45.3067 81.5021C49.0347 82.5615 52.7132 82.638 56.3422 81.7315C59.9417 80.7956 63.1169 78.9555 65.868 76.2115C68.4772 73.6088 70.2392 70.642 71.154 67.3111C72.0392 63.9506 72.0844 60.5727 71.2897 57.1773C70.4654 53.7525 68.8953 50.6587 66.5793 47.8959L64.5811 45.9028C63.97 45.2932 62.9883 45.2842 62.3883 45.8826L48.6078 59.6284C48.0078 60.2268 48.0169 61.2061 48.628 61.8156L49.6971 62.8821C50.3082 63.4916 51.2899 63.5006 51.8899 62.9022L61.4258 53.3903C62.0699 52.7478 63.146 52.81 63.6749 53.5697C65.7323 56.5243 66.7315 59.5864 66.6726 62.7561C66.6044 66.4223 65.1239 69.6982 62.2311 72.5837C60.1607 74.6489 57.801 76.0293 55.1519 76.7251C52.5017 77.3631 49.7778 77.2488 46.9803 76.382C44.2111 75.487 41.6142 73.8302 39.1896 71.4117C36.765 68.9933 35.1041 66.4029 34.2068 63.6408C33.3083 60.8208 33.1936 58.1038 33.8628 55.4897C34.5308 52.8179 35.9 50.4494 37.9703 48.3842C40.0407 46.3191 42.3585 45.01 44.9236 44.4568C47.1554 43.944 49.4221 44.036 51.724 44.7327C52.3043 44.9083 52.9367 44.7812 53.3595 44.3595L55.7269 41.998C56.4878 41.239 56.2341 39.9418 55.2009 39.5889C51.8384 38.4405 48.4751 38.2017 45.111 38.8726Z',
            fill: 'currentColor',
          },
        },
      ],
    },
    props,
  )
}

export function ArrowLeft(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        { tag: 'line', attr: { x1: '19', y1: '12', x2: '5', y2: '12' } },
        { tag: 'polyline', attr: { points: '12 19 5 12 12 5' } },
      ],
    },
    props,
  )
}

export function ChevronLeft(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [{ tag: 'polyline', attr: { points: '15 6 9 12 15 18' } }],
    },
    props,
  )
}

export function ChevronRight(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [{ tag: 'polyline', attr: { points: '9 6 15 12 9 18' } }],
    },
    props,
  )
}

export function ArrowRight(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        { tag: 'line', attr: { x1: '5', y1: '12', x2: '19', y2: '12' } },
        { tag: 'polyline', attr: { points: '12 5 19 12 12 19' } },
      ],
    },
    props,
  )
}

export function Search(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        width: props.size || '24',
        height: props.size || '24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        { tag: 'circle', attr: { cx: '10', cy: '10', r: '7' } },
        { tag: 'line', attr: { x1: '21', y1: '21', x2: '15', y2: '15' } },
      ],
    },
    props,
  )
}

export function Check(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [{ tag: 'polyline', attr: { points: '20 6 9 17 4 12' } }],
    },
    props,
  )
}

// export function CheckSquare(props, checkFill, checkStyle) {
//   return GenerateIcon(
//     {
//       tag: "svg",
//       attr: {
//         viewBox: "0 0 24 24",
//         fill: "none",
//         stroke: "currentColor",
//         strokeWidth: "2",
//         strokeLinecap: "round",
//         strokeLinejoin: "round",
//       },
//       child: [
//         { tag: "polyline", attr: { points: "9 11 12 14 22 4" } },
//         {
//           tag: "path",
//           attr: {
//             fill: checkFill,
//             style: checkStyle,
//             d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
//           },
//         },
//       ],
//     },
//     props
//   );
// }

export function Facebook(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
          },
        },
      ],
    },
    props,
  )
}

export function Trash(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        className: 'trash',
        viewBox: '0 0 24 24',
        width: props.size || '24',
        height: props.size || '24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z', stroke: 'none' } },
        { tag: 'line', attr: { x1: '4', y1: '7', x2: '20', y2: '7' } },
        { tag: 'line', attr: { x1: '10', y1: '11', x2: '10', y2: '17' } },
        { tag: 'line', attr: { x1: '14', y1: '11', x2: '14', y2: '17' } },
        { tag: 'path', attr: { d: 'M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' } },
        { tag: 'path', attr: { d: 'M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' } },
      ],
    },
    props,
  )
}

export function Bag(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M17 6C17 5.95299 16.9994 5.90613 16.9981 5.85943C16.9236 3.163 14.7144 1 12 1C9.31057 1 7.11706 3.12341 7.00455 5.78518C7.00154 5.85641 7.00002 5.92803 7.00002 6M17 6H7.00002M17 6H18.3087C20.3944 6 21.4373 6 22.0335 6.66616C22.6298 7.33231 22.5146 8.36879 22.2843 10.4417L21.9884 13.1043C21.5183 17.3356 21.2832 19.4513 19.8594 20.7256C18.4356 22 16.2904 22 12 22C7.70962 22 5.56443 22 4.14063 20.7256C2.71683 19.4513 2.48176 17.3356 2.01161 13.1043L1.71577 10.4417C1.48544 8.36879 1.37028 7.33231 1.96652 6.66616C2.56276 6 3.60561 6 5.6913 6H7.00002',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          },
        },
      ],
    },
    props,
  )
}

export function Cart(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        width: props.size || '24',
        height: props.size || '24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      child: [
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19C8 17.8954 7.10457 17 6 17ZM6 17H17M6 17V3H4M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM6 5L20 6L19 13H6',
          },
        },
      ],
    },
    props,
  )
}

export function Hidden(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        width: props.size || '24',
        height: props.size || '24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      child: [
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M3 3L21 21M10.584 10.587C10.2087 10.962 9.99778 11.4707 9.99759 12.0013C9.9974 12.5318 10.208 13.0407 10.583 13.416C10.958 13.7913 11.4667 14.0022 11.9973 14.0024C12.5278 14.0026 13.0367 13.792 13.412 13.417M9.363 5.365C10.2204 5.11972 11.1082 4.99684 12 5C16 5 19.333 7.333 22 12C21.222 13.361 20.388 14.524 19.497 15.488M17.357 17.349C15.726 18.449 13.942 19 12 19C8 19 4.667 16.667 2 12C3.369 9.605 4.913 7.825 6.632 6.659',
          },
        },
      ],
    },
    props,
  )
}

export function Visible(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        width: props.size || '24',
        height: props.size || '24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      child: [
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z',
          },
        },
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M22 12C19.333 16.667 16 19 12 19C8 19 4.667 16.667 2 12C4.667 7.333 8 5 12 5C16 5 19.333 7.333 22 12Z',
          },
        },
      ],
    },
    props,
  )
}

export function CartPlus(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        width: props.size || '24',
        height: props.size || '24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      child: [
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19C8 17.8954 7.10457 17 6 17ZM6 17H17M6 17V3H4M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM6 5L12.005 5.429M19.143 12.002L19 13H6M15 6H21M18 3V9',
          },
        },
      ],
    },
    props,
  )
}

export function Github(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        width: props.size || '24',
        height: props.size || '24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      child: [
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M9 19C4.7 20.4 4.7 16.5 3 16M15 21V17.5C15 16.5 15.1 16.1 14.5 15.5C17.3 15.2 20 14.1 20 9.49995C19.9988 8.30492 19.5325 7.15726 18.7 6.29995C19.0905 5.26192 19.0545 4.11158 18.6 3.09995C18.6 3.09995 17.5 2.79995 15.1 4.39995C13.0672 3.87054 10.9328 3.87054 8.9 4.39995C6.5 2.79995 5.4 3.09995 5.4 3.09995C4.94548 4.11158 4.90953 5.26192 5.3 6.29995C4.46745 7.15726 4.00122 8.30492 4 9.49995C4 14.1 6.7 15.2 9.5 15.5C8.9 16.1 8.9 16.7 9 17.5V21',
          },
        },
      ],
    },
    props,
  )
}

export function Star(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        width: props.size || '24',
        height: props.size || '24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      child: [
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M12.0001 17.75L5.82808 20.995L7.00708 14.122L2.00708 9.25495L8.90708 8.25495L11.9931 2.00195L15.0791 8.25495L21.9791 9.25495L16.9791 14.122L18.1581 20.995L12.0001 17.75Z',
          },
        },
      ],
    },
    props,
  )
}

export function StarHalf(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        width: props.size || '24',
        height: props.size || '24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      child: [
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M12.0001 17.75L5.82808 20.995L7.00708 14.122L2.00708 9.25495L8.90708 8.25495L11.9931 2.00195L12.0001 17.75Z',
          },
        },
      ],
    },
    props,
  )
}

export function Heart(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        width: props.size || '24',
        height: props.size || '24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      child: [
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572',
          },
        },
      ],
    },
    props,
  )
}

export function Instagram(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            d: 'M16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4Z',
          },
        },
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            d: 'M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z',
          },
        },
      ],
    },
    props,
  )
}

export function Linkedin(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M8 11V16M8 8V8.01M12 16V11M16 16V13C16 12.4696 15.7893 11.9609 15.4142 11.5858C15.0391 11.2107 14.5304 11 14 11C13.4696 11 12.9609 11.2107 12.5858 11.5858C12.2107 11.9609 12 12.4696 12 13M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z',
          },
        },
      ],
    },
    props,
  )
}

export function Minus(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [{ tag: 'line', attr: { x1: '5', y1: '12', x2: '19', y2: '12' } }],
    },
    props,
  )
}

// export function PlayCircle(props:any) {
//   return GenerateIcon(
//     {
//       tag: "svg",
//       attr: {
//         viewBox: "0 0 24 24",
//         fill: "none",
//         stroke: "currentColor",
//         strokeWidth: "2",
//         strokeLinecap: "round",
//         strokeLinejoin: "round",
//       },
//       child: [
//         { tag: "circle", attr: { cx: "12", cy: "12", r: "10" } },
//         { tag: "polygon", attr: { points: "10 8 16 12 10 16 10 8" } },
//       ],
//     },
//     props
//   );
// }

export function Plus(props: any) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        { tag: 'line', attr: { x1: '12', y1: '5', x2: '12', y2: '19' } },
        { tag: 'line', attr: { x1: '5', y1: '12', x2: '19', y2: '12' } },
      ],
    },
    props,
  )
}
