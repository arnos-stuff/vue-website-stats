
function getLogoPath(size) {
    var logoPath = [
        "m 0 -4.5",
        "l -3.5619 1.7144",
        "c -0.0643 0.031 -0.1108 0.0893 -0.1266 0.1588",
        "l -0.8798 3.852",
        "c -0.0158 0.0693 0.0007 0.1423 0.0452 0.198",
        "l 2.4648 3.0891",
        "c 0.0445 0.0557 0.1118 0.0882 0.1831 0.0882",
        "l 3.9532 0",
        "c 0.0713 0 0.1386 -0.0325 0.183 -0.0882",
        "l 2.4649 -3.0891",
        "c 0.0444 -0.0557 0.061 -0.1286 0.0452 -0.198",
        "l -0.8796 -3.8521",
        "c -0.0158 -0.0693 -0.0625 -0.1278 -0.1266 -0.1588",
        "l -3.5618 -1.7144",
        "c -0.0644 -0.0308 -0.1393 -0.0308 -0.2033 0.0002",
        "z",
        "m 0 0"
    ];

    var resizedLogoPath = [];

    logoPath.forEach(
        instruction => {
            var items = instruction.split(" ");
            if (instruction[0] === "m") {
                items[1] = String(Number(items[1]) * size);
                items[2] = String(Number(items[2]) * size);
                instruction = items.join(" ");
            } else if (instruction[0] === "l") {
                items = instruction.split(" ");
                items[1] = String(Number(items[1]) * size);
                items[2] = String(Number(items[2]) * size);
                instruction = items.join(" ");
            }
            else if (instruction[0] === "c") {
                items = instruction.split(" ");
                items[1] = String(Number(items[1]) * size);
                items[2] = String(Number(items[2]) * size);
                items[3] = String(Number(items[3]) * size);
                items[4] = String(Number(items[4]) * size);
                items[5] = String(Number(items[5]) * size);
                items[6] = String(Number(items[6]) * size);
                instruction = items.join(" ");
            }
            resizedLogoPath.push(instruction);
        });
    return resizedLogoPath.join(" ");
}


export default getLogoPath;
