import { LogoProps } from "./Logo";

export const LogoMark = ({ theme, width = 300 }: LogoProps) => {
  return (
    <svg
      width={width}
      height="100%"
      viewBox="0 0 510 598"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
    >
      <g transform="matrix(1,0,0,1,-847.539,-584.521)">
        <g transform="matrix(4.16667,0,0,4.16667,0,0)">
          <g transform="matrix(1,0,0,1,275.054,189.464)">
            <path
              d="M0,-42.76C17.443,-42.76 33.828,-35.979 46.136,-23.667L50.676,-28.206C37.154,-41.73 19.157,-49.179 0,-49.179C-33.982,-49.179 -62.453,-25.375 -69.767,6.419L-63.15,6.419C-55.97,-21.798 -30.421,-42.76 0,-42.76"
              style={{
                fill: theme === "light" ? "#fff" : "rgb(0,124, 124)",
                fillRule: "nonzero",
              }}
            />
          </g>
          <g transform="matrix(1,0,0,1,321.19,189.942)">
            <path
              d="M0,68.125C-12.309,80.437 -28.693,87.218 -46.136,87.218C-81.02,87.218 -109.514,59.672 -111.203,25.198L-93.856,25.198C-93.447,33.411 -91.567,40.711 -88.026,46.981C-84.026,54.073 -78.435,59.574 -71.257,63.49C-64.081,67.405 -55.792,69.404 -46.398,69.492C-39.611,69.492 -33.631,68.645 -28.454,66.948C-23.277,65.253 -18.863,63.098 -15.208,60.488C-11.553,57.877 -8.728,55.269 -6.724,52.659L-6.724,31.126C-6.9,27.211 -4.725,25.253 -0.201,25.253L1.757,25.253L1.757,23.948L-27.475,23.948L-27.475,25.253L-25.386,25.253C-20.95,25.253 -18.731,27.211 -18.731,31.126L-18.863,53.18C-20.777,55.705 -23.168,57.836 -26.039,59.574C-28.91,61.315 -32.021,62.664 -35.37,63.621C-38.72,64.578 -42.178,65.055 -45.745,65.055C-52.792,64.97 -58.904,63.164 -64.081,59.64C-69.257,56.117 -73.28,51.137 -76.151,44.699C-79.022,38.261 -80.458,30.78 -80.458,22.251C-80.458,13.465 -79.002,5.832 -76.085,-0.65C-73.173,-7.13 -69.038,-12.156 -63.689,-15.723C-58.339,-19.29 -52.054,-21.075 -44.832,-21.075C-39.438,-21.075 -34.544,-20.204 -30.149,-18.465C-25.759,-16.722 -22.038,-14.135 -18.992,-10.7C-15.948,-7.262 -13.73,-2.847 -12.337,2.547L-11.163,2.547L-12.99,-17.16C-15.514,-18.725 -18.427,-20.138 -21.734,-21.401C-25.04,-22.66 -28.737,-23.661 -32.825,-24.401C-36.916,-25.139 -41.352,-25.512 -46.137,-25.512C-55.707,-25.512 -64.081,-23.554 -71.257,-19.639C-78.435,-15.723 -84.026,-10.198 -88.026,-3.066C-91.567,3.244 -93.447,10.564 -93.856,18.779L-117.619,18.779C-117.667,19.851 -117.781,20.905 -117.781,21.989C-117.781,61.494 -85.642,93.637 -46.136,93.637C-26.979,93.637 -8.983,86.188 4.539,72.664L0,68.125Z"
              style={{
                fill: theme === "light" ? "#fff" : "rgb(0,124, 124)",
                fillRule: "nonzero",
              }}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};