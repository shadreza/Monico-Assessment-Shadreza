import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { StyleSheet } from 'react-native';

const TabBarIcon = (props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    size?: number
}) => {
    return <FontAwesome size={18} {...props} />;
}

export default TabBarIcon

const styles = StyleSheet.create({})