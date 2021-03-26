// Simple hash function to generate react keys
// Source: GitHub user max-s-h at https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0#gistcomment-3586164
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
export const hashCode = function (s: string) {
    let h = 0;
    let i = s.length;
    while (i > 0) {
        h = ((h << 5) - h + s.charCodeAt(--i)) | 0;
    }
    return h;
};
