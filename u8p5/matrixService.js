export class MatrixService {
    // read CodePath's explanation: https://guides.codepath.org/compsci/Flood-Fill
    //
    static floodFill(image, sr, sc, color) {
        // create visited map
        // without visited map, we would re-visit the locations we have already visited
        let visited = Array.from({ length: image.length }, () => {
            return Array.from({ length: image[0].length }, () => false)
        });
        // traverse the map
        dfs(sr, sc, image[sr][sc]);
        return image;

        function dfs(r, c, sc) {
            // return if walked out of bounds
            // return if already visited the location
            // return if the location does not have the same color as the starting location
            if (r < 0 || r >= image.length || c < 0 || c >= image[0].length
                || visited[r][c] || image[r][c] !== sc)
                return;

            // mark location as visited
            visited[r][c] = true;
            // fill location with user input color
            image[r][c] = color;

            // explore all 4 directions
            dfs(r - 1, c, sc);
            dfs(r + 1, c, sc);
            dfs(r, c - 1, sc);
            dfs(r, c + 1, sc);
        }
    }
}