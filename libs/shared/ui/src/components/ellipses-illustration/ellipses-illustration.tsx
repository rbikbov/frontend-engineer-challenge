'use client';

import * as React from 'react';

/**
 * Премиальная иллюстрация для страниц авторизации и ошибок.
 * Использует сложные SVG-фильтры и градиенты.
 * Для безопасности ID внутри SVG используется React.useId().
 */

export const EllipsesIllustration = ({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  const id = React.useId();

  // Генерируем уникальные ID для всех внутренних элементов SVG
  const filter0 = `filter0-${id}`;
  const filter1 = `filter1-${id}`;
  const filter3 = `filter3-${id}`;
  const filter4 = `filter4-${id}`;
  const mask0 = `mask0-${id}`;

  const paint0 = `paint0-${id}`;
  const paint1 = `paint1-${id}`;
  const paint2 = `paint2-${id}`;
  const paint3 = `paint3-${id}`;
  const paint4 = `paint4-${id}`;
  const paint5 = `paint5-${id}`;

  const bgblur = `bgblur-${id}`;

  return (
    <svg
      width="512"
      height="480"
      viewBox="0 0 512 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g filter={`url(#${filter0})`}>
        <circle cx="40" cy="180" r="40" fill={`url(#${paint0})`} />
      </g>
      <g filter={`url(#${filter1})`}>
        <circle cx="442" cy="48" r="40" fill={`url(#${paint1})`} />
      </g>

      {/* Glass Background with Blur */}
      <foreignObject x="12" y="-20" width="520" height="520">
        <div
          style={{
            backdropFilter: 'blur(10px)',
            clipPath: `url(#${bgblur})`,
            height: '100%',
            width: '100%',
          }}
        />
      </foreignObject>

      <g data-figma-bg-blur-radius="20">
        <circle
          cx="272"
          cy="240"
          r="240"
          fill={`url(#${paint2})`}
          fillOpacity="0.8"
        />
        <circle
          cx="272"
          cy="240"
          r="240"
          fill={`url(#${paint3})`}
          fillOpacity="0.2"
        />
      </g>

      <mask
        id={mask0}
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="32"
        y="0"
        width="480"
        height="480"
      >
        <circle cx="272" cy="240" r="240" fill="#D9D9D9" />
      </mask>

      <g mask={`url(#${mask0})`}>
        <g filter={`url(#${filter3})`}>
          <circle
            cx="272"
            cy="240"
            r="240"
            transform="rotate(-30 272 240)"
            stroke={`url(#${paint4})`}
            strokeOpacity="0.75"
            strokeWidth="24"
          />
        </g>
      </g>

      <g filter={`url(#${filter4})`}>
        <circle cx="442" cy="438" r="40" fill={`url(#${paint5})`} />
      </g>

      <defs>
        <filter
          id={filter0}
          x="0"
          y="140"
          width="80"
          height="80"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="12" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_7178_14"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_7178_14"
            result="effect2_innerShadow_7178_14"
          />
        </filter>

        <filter
          id={filter1}
          x="402"
          y="8"
          width="80"
          height="80"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="12" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_7178_14"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_7178_14"
            result="effect2_innerShadow_7178_14"
          />
        </filter>

        <clipPath id={bgblur} transform="translate(-12 20)">
          <circle cx="272" cy="240" r="240" />
        </clipPath>

        <filter
          id={filter3}
          x="-12.042"
          y="-44.042"
          width="568.084"
          height="568.084"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="16"
            result="effect1_foregroundBlur_7178_14"
          />
        </filter>

        <filter
          id={filter4}
          x="402"
          y="398"
          width="80"
          height="80"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="12" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_7178_14"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_7178_14"
            result="effect2_innerShadow_7178_14"
          />
        </filter>

        <linearGradient
          id={paint0}
          x1="80"
          y1="180"
          x2="1.70935e-06"
          y2="166.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4262FB" />
          <stop offset="1" stopColor="#4E6CFD" />
        </linearGradient>
        <linearGradient
          id={paint1}
          x1="402"
          y1="88"
          x2="482"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4262FB" />
          <stop offset="1" stopColor="#4E6CFD" />
        </linearGradient>
        <radialGradient
          id={paint2}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(512 480) rotate(-135) scale(678.823)"
        >
          <stop offset="0.140625" stopColor="#F5F6F8" />
          <stop offset="0.854167" stopColor="#DCE0EA" />
        </radialGradient>
        <radialGradient
          id={paint3}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(272 240) rotate(90) scale(240)"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={paint4}
          x1="272"
          y1="-9.15527e-05"
          x2="272"
          y2="480"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient
          id={paint5}
          x1="402"
          y1="398"
          x2="482"
          y2="478"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4262FB" />
          <stop offset="1" stopColor="#4E6CFD" />
        </linearGradient>
      </defs>
    </svg>
  );
};
