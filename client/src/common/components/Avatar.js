import Avatar from "@mui/material/Avatar";

const MAvatar = ({ src, dim, main, selected }) => {

    const avatarItemCSS = {
        mb: 2,
        cursor: 'pointer',
        border: '2px solid red'
    };

    return (
        <Avatar
            src={src}
            sx={{
                height: dim,
                width: dim,
                mx: main ? 'auto' : 1,
                mb: main ? undefined : 2,
                cursor: main ? undefined : 'pointer',
                border: selected ? '4px solid' : undefined,
                borderColor: 'secondary.dark'
            }}
        />
    );
}

export default MAvatar;