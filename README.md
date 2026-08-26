# Universal POS

Modern Point of Sale system built with Laravel API and React.

## Tech Stack

### Backend

- Laravel
- PHP
- Laravel Sanctum
- Spatie Laravel Permission
- MySQL

### Frontend

- React
- TypeScript
- Vite
- Axios

## Current Features

- Authentication
- Login
- Logout
- Protected Routes
- Token-based API authentication
- Role & Permission
- Admin role
- Cashier role

## Roadmap

- [x] Project Setup
- [x] Authentication
- [x] Protected Routes
- [x] Role & Permission
- [ ] Category Management
- [ ] Product Management
- [ ] Inventory
- [ ] Customer Management
- [ ] POS
- [ ] Transactions
- [ ] Reports

## Development

### Backend

```bash
cd backend
composer install
php artisan migrate
php artisan db:seed
php artisan serve