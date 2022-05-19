import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Avatar,
    Badge,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { orange } from '@mui/material/colors';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../stores/user/actions';

type Props = {
    isCustomer?: boolean;
    badgeCount?: number;
    onClickShoppingCart?: () => void;
};

const HeaderBar = (props: Props) => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    );
    const dispatch = useDispatch();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="static" sx={{ py: 2 }}>
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        LOGO
                    </Typography>
                    {props.isCustomer && (
                        <IconButton
                            onClick={() =>
                                props.onClickShoppingCart &&
                                props.onClickShoppingCart()
                            }
                        >
                            <Badge
                                badgeContent={props.badgeCount}
                                color="error"
                            >
                                <ShoppingCartIcon sx={{ color: 'white' }} />
                            </Badge>
                        </IconButton>
                    )}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                    sx={{ bgcolor: orange[500] }}
                                >
                                    <PersonOutlineIcon />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem
                                key={'Logout'}
                                onClick={() => {
                                    dispatch(logoutUser());
                                    handleCloseUserMenu();
                                }}
                            >
                                <Typography textAlign="center">
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default HeaderBar;
