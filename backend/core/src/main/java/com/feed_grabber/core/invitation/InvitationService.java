package com.feed_grabber.core.invitation;

import com.feed_grabber.core.auth.exceptions.UserAlreadyExistsException;
import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.invitation.dto.InvitationDto;
import com.feed_grabber.core.invitation.dto.InvitationGenerateRequestDto;
import com.feed_grabber.core.invitation.dto.InvitationGenerateResponseDto;
import com.feed_grabber.core.invitation.dto.InvitationSignUpDto;
import com.feed_grabber.core.invitation.exceptions.InvitationAlreadyExistsException;
import com.feed_grabber.core.invitation.exceptions.InvitationNotFoundException;
import com.feed_grabber.core.invitation.exceptions.InvitationUserAlreadyExistsException;
import com.feed_grabber.core.invitation.model.Invitation;
import com.feed_grabber.core.rabbit.Sender;
import com.feed_grabber.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InvitationService {
    private final InvitationRepository invitationRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final Sender emailSender;

    @Autowired
    public InvitationService(InvitationRepository invitationRepository,
                             CompanyRepository companyRepository,
                             UserRepository userRepository,
                             Sender emailSender) {
        this.invitationRepository = invitationRepository;
        this.companyRepository = companyRepository;
        this.userRepository =userRepository;
        this.emailSender = emailSender;
    }

    public InvitationSignUpDto getById(UUID id) throws InvitationNotFoundException {
        var invitation = invitationRepository.findById(id)
                .orElseThrow(InvitationNotFoundException::new);

        return InvitationMapper.MAPPER.invitationToInvitationSignUpDto(invitation);
    }

    public List<InvitationDto> getByCompanyId(UUID companyId) {
        return invitationRepository
                .findByCompanyIdOrderByCreatedAtDesc(companyId)
                .stream()
                .map(InvitationMapper.MAPPER::invitationToDto)
                .collect(Collectors.toList());
    }

    public InvitationGenerateResponseDto generate(InvitationGenerateRequestDto dto)
            throws CompanyNotFoundException, InvitationAlreadyExistsException, InvitationUserAlreadyExistsException {

        var company = companyRepository.findById(dto.getCompanyId())
                .orElseThrow(CompanyNotFoundException::new);
        var existingInvitation = invitationRepository.findByCompanyIdAndEmail(
                dto.getCompanyId(), dto.getEmail()
        );
        if (existingInvitation.isPresent()) {
            throw new InvitationAlreadyExistsException();
        }

        var existingUser = userRepository.findByCompanyIdAndEmail(company.getId(), dto.getEmail());
        if (existingUser.isPresent()) {
            throw new InvitationUserAlreadyExistsException();
        }

        var invitation = InvitationMapper.MAPPER.invitationDtoToModel(dto);
        invitation = invitationRepository.save(invitation);
        emailSender.sendToProcessor(
                "http://feedgrabber.com.localhost:3000/sign-up/" + invitation.getId().toString(),
                invitation.getEmail(),
                "INVITE"
        );
        return InvitationMapper.MAPPER.invitationToGenerateDto(invitation);
    }

    public void deleteByCompanyIdAndEmail(UUID companyId, String email) {
        invitationRepository.deleteByCompanyIdAndEmail(companyId, email);
    }
}
