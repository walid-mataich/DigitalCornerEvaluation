package com.digitalcorner.evaluation_app.services;


import com.digitalcorner.evaluation_app.repositories.AdministrateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AdministrateurDetailsService implements UserDetailsService {

    @Autowired
   private  AdministrateurRepository administrateurRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return administrateurRepository.findByEmail(username).orElseThrow();
    }
}
