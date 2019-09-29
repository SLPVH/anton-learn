import { createStyles } from "@material-ui/core";

export default function styles({ palette, spacing }) {
    return createStyles({
        paper: {
            marginTop: spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        avatar: {
            margin: spacing(1),
            backgroundColor: palette.common.white
        },
        form: {
            width: "100%", // Fix IE 11 issue.
            marginTop: spacing(1)
        },
        submit: {
            margin: spacing(3, 0, 2)
        }
    });
}
