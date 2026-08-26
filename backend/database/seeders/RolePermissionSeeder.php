<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Permissions
        |--------------------------------------------------------------------------
        */

        $permissions = [
            'view dashboard',

            'view products',
            'create products',
            'edit products',
            'delete products',

            'view categories',
            'create categories',
            'edit categories',
            'delete categories',

            'view inventory',
            'create stock',
            'edit stock',
            'delete stock',

            'view users',
            'create users',
            'edit users',
            'delete users',

            'view customers',
            'create customers',
            'edit customers',
            'delete customers',

            'view transactions',
            'create transactions',

            'access pos',

            'view reports',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Roles
        |--------------------------------------------------------------------------
        */

        $admin = Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'web',
        ]);

        $cashier = Role::firstOrCreate([
            'name' => 'cashier',
            'guard_name' => 'web',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Admin Permissions
        |--------------------------------------------------------------------------
        */

        $admin->syncPermissions($permissions);

        /*
        |--------------------------------------------------------------------------
        | Cashier Permissions
        |--------------------------------------------------------------------------
        */

        $cashier->syncPermissions([
            'view dashboard',

            'access pos',

            'view transactions',
            'create transactions',

            'view customers',
            'create customers',
            'edit customers',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Admin User
        |--------------------------------------------------------------------------
        */

        $adminUser = User::updateOrCreate(
            [
                'email' => 'admin@universalpos.test',
            ],
            [
                'name' => 'POS Administrator',
                'password' => Hash::make('password123'),
            ]
        );

        $adminUser->syncRoles(['admin']);

        /*
        |--------------------------------------------------------------------------
        | Cashier User
        |--------------------------------------------------------------------------
        */

        $cashierUser = User::updateOrCreate(
            [
                'email' => 'cashier@universalpos.test',
            ],
            [
                'name' => 'POS Cashier',
                'password' => Hash::make('password123'),
            ]
        );

        $cashierUser->syncRoles(['cashier']);
    }
}