import React, {FC} from "react";
import {Header as HeUI, Icon, Image, Input, Menu, Popup} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {history} from "../../helpers/history.helper";
import styles from "./styles.module.sass";
import icon from "../../assets/images/icon_scaled.png";
import {logoutRoutine} from "../../sagas/auth/routines";
import {connect, ConnectedProps} from "react-redux";
import {IAppState} from "../../models/IAppState";
import NotificationMenu from "../NotificationMenu";
import {toggleMenuRoutine} from "../../sagas/app/routines";
import styled from "styled-components";

const StyledItem = styled(Menu.Item)`
    font-size: 1.15em !important;
    color: white !important;
`;

const StyledMenu = styled(Menu)`
    background: #535E87 !important;
    color: white !important;
    border-radius: 7px !important;
`;

const defaultAvatar =
    "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

const Header: FC<Props> = ({user, logout, toggleMenu, isEditing}) => {

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.headerContent}>
                <div className={styles.headerPart}>
                    <div className={styles.headerTitle}>
                        <img onClick={toggleMenu} alt="FeedGrabber" className={styles.headerLogo} src={icon}/>
                        <h1 className={styles.headerServiceName} onClick={() => history.push('/')}>FeedGrabber</h1>
                    </div>
                    <NavLink exact to="/pending" activeClassName={styles.headerMenuItemActive}
                             className={styles.headerMenuItem}>
                        PENDING FEEDBACKS
                    </NavLink>
                    <NavLink exact to="/editor"
                             className={`${styles.headerMenuItem} ${isEditing && styles.headerMenuItemActive}`}>
                        FORM EDITOR
                    </NavLink>
                    <a href="/#" className={styles.headerMenuItem}>
                        ASSIGN FEEDBACKS
                    </a>
                </div>
                <div className={styles.headerPart}>
                    <Input placeholder='Search...' size="small" transparent inverted
                           icon={<Icon name='search' inverted link/>}/>
                    <div className={styles.headerBellWrapper}>
                        <NotificationMenu/>
                    </div>
                    <Popup on='click' style={{padding: 0, background: '#535E87', border: 'none'}} basic
                           trigger={<Image avatar src={user?.avatar ?? defaultAvatar} className={styles.headerAvatar}/>}
                    >
                        <StyledMenu vertical>
                            <Menu.Item disabled>
                                <HeUI style={{color: 'white'}} as='h4'><Icon name="user"/>{user.userName}</HeUI>
                            </Menu.Item>
                            <StyledItem name="Profile" onClick={() => history.push('/profile')}/>
                            <StyledItem name="Settings" onClick={() => history.push('/profile/settings')}/>
                            <StyledItem name="Requests" onClick={() => history.push('/requests')}/>
                            <StyledItem name="Log out" onClick={logout}/>
                        </StyledMenu>
                    </Popup>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IAppState) => ({
    user: state.user.info,
    isEditing: !!state.questionnaires.current.get.id
});
const mapDispatchToProps = {
    logout: logoutRoutine,
    toggleMenu: toggleMenuRoutine
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;
export default connector(Header);
