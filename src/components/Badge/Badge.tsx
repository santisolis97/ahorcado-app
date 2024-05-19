import React from 'react';
import classNames from 'classnames';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'primary',
    className = '',
}) => {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-lg font-medium';
    const variantStyles = {
        primary: 'bg-blue-100 text-blue-800',
        secondary: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800',
        danger: 'bg-red-100 text-red-800',
        warning: 'bg-yellow-100 text-yellow-800',
        info: 'bg-blue-100 text-blue-800',
        light: 'bg-gray-100 text-gray-800',
        dark: 'bg-gray-800 text-gray-100',
    };

    const classes = classNames(
        className,
        baseStyles,
        variantStyles[variant],
    );

    return (
        <span className={classes}>
            {children}
        </span>
    );
};

