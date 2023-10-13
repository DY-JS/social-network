import React, {ChangeEvent} from 'react';

type ProfilePropsType = {
    status: string | undefined;
    updateUserStatus: (newStatus: string) => void;
};

type ProfileStateType = {
    editMode: boolean;
    status: string;
};

class ProfileStatus extends React.Component<ProfilePropsType, ProfileStateType> {
    state: ProfileStateType = {
        editMode: false,
        status: this.props.status || '',
    };

    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    };

    deactivateEditMode = () => { //по onBlur
        this.setState({
            editMode: false,
        });
        this.props.updateUserStatus(this.state.status);
    };

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.target.value,
        });
    };

    componentDidUpdate(prevProps: ProfilePropsType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status || '',
            });
        }
    }

    render() {

        return (
            <div>
                {!this.state.editMode ? (
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || 'No status'}</span>
                    </div>
                ) : (
                    <div>
                        <input
                            autoFocus={true}
                            onBlur={this.deactivateEditMode}
                            value={this.state.status}
                            onChange={this.onStatusChange}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default ProfileStatus;
